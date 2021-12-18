from django.conf import settings
from django.contrib.auth import get_user_model
from drf_yasg import openapi
from rest_framework import (mixins, generics, status, permissions)
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.http.response import Http404, HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from drf_yasg.utils import swagger_auto_schema

from Accounts.serializers import GoogleSocialAuthSerializer, UserSerializer, EmailVerificationSerializer, SendTwoStepVerificationSerializer,TwoStepVerificationSerializer, PhoneVerificationSerializer, LoginSerializer, ResetPasswordEmailRequestSerializer,SetNewPasswordSerializer, LogoutSerializer
from .models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.decorators import api_view, permission_classes

from django.shortcuts import render

#for reseting password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
import os

#phone verification
from . import verifyPhone

from .permission import EmailVerifiedPermission
# Create your views here.


class SignUp(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.save_user(serializer.data)
            # user = User.objects.get(email=user_data['id'])

            token = RefreshToken.for_user(user_data).access_token
            # token = Token.objects.get_or_create(user=user)
            relative_link = reverse('EmailVerification')
            abs_url = settings.FRONT_END_HOST + relative_link + "?token=" + str(token)
            email_body = "Hiii! Use link below to verify your email \n"+ abs_url
            data ={'email_body': email_body, 'email_subject': "Verify your Email",'to_email':user_data.email}
            Util.send_email(data)
            # send_mail(subject="Verify your Email",message=email_body,from_email=settings.EMAIL_HOST_USER, recipient_list=[user.email],fail_silently=False)
            
            verifyPhone.send(user_data.phone)

            #for two step auth
            # user = User.objects.get(email=user_data.email)
            # if user_data.twostep :
            #     user.twostep = False

            return JsonResponse({'status': 'created', 'token': str(token), 'phone':str(user_data.phone)}, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmail(APIView):

    serializer_class = EmailVerificationSerializer

    token_param_config = openapi.Parameter('token',in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description="Enter token here")

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request, *args, **kwargs):
        # token = self.kwargs['pk']
        token = request.GET.get('token')

        try:
            payload = jwt.decode(token,settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=payload['user_id'])
            if not user.verified:
                user.verified = True
                user.active = True
                user.save()
            return JsonResponse({'status': 'Email Successfully Verified'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return JsonResponse({'error':"Activation Link has expired"}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return JsonResponse({'error':"Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)



# @permission_classes((EmailVerifiedPermission,))
class VerifyPhone(generics.GenericAPIView):
    serializer_class = PhoneVerificationSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            if User.objects.filter(phone=serializer.data['phone']).exists():
                user = User.objects.get(phone=serializer.data['phone'])
                # phone = request.data.get('phone', '')
                code = serializer.data['code']
                if verifyPhone.check(serializer.data['phone'], code):
                    user.verifiedPhone = True
                    user.active = True
                    user.save()
                    return JsonResponse({'status': 'Phone Successfully Verified'}, status=status.HTTP_200_OK)
        return JsonResponse({'error':"Code Expired"}, status=status.HTTP_400_BAD_REQUEST)


class sendTwoStep(APIView):
    serializer_class = SendTwoStepVerificationSerializer

    token_param_config = openapi.Parameter('token',in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description="Enter token here")

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request, *args, **kwargs):
        token = request.GET.get('token')

        try:
            payload = jwt.decode(token,settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=payload['user_id'])
            verifyPhone.send(user.phone)
            relative_link = reverse('TwoStep')
            abs_url = settings.FRONT_END_HOST + relative_link 
            return JsonResponse({'status': 'Two step code sent to registered phone number', 'To enter code': abs_url}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return JsonResponse({'error':"Activation Link has expired"}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return JsonResponse({'error':"Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)


class TwoStep(APIView):
    serializer_class = TwoStepVerificationSerializer

    token_param_config = openapi.Parameter('token',in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description="Enter token here")
    code_param_config = openapi.Parameter('code',in_=openapi.IN_QUERY, type=openapi.TYPE_STRING, description="Enter code here")

    @swagger_auto_schema(manual_parameters=[token_param_config, code_param_config])
    def get(self, request, *args, **kwargs):
        token = request.GET.get('token')
        code = request.GET.get('code')
        try:
            payload = jwt.decode(token,settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=payload['user_id'])
            if verifyPhone.check(user.phone, code):
                user.login2stepverify = True
                user.save()
                return JsonResponse({'status': '2 step verification Successful'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return JsonResponse({'error':"Activation Link has expired"}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return JsonResponse({'error':"Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)
   
   
class Login(generics.GenericAPIView):

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        return JsonResponse(serializer.validated_data, status=status.HTTP_200_OK)



class GoogleSocialAuthView(GenericAPIView):

    serializer_class = GoogleSocialAuthSerializer

    def post(self, request):
        """
        POST with "auth_token"
        Send an idtoken as from google to get user information
        """

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = ((serializer.validated_data)['auth_token'])
        return Response(data, status=status.HTTP_200_OK)


# class FacebookSocialAuthView(GenericAPIView):

#     serializer_class = FacebookSocialAuthSerializer

#     def post(self, request):
#         """
#         POST with "auth_token"
#         Send an access token as from facebook to get user information
#         """

#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         data = ((serializer.validated_data)['auth_token'])
#         return Response(data, status=status.HTTP_200_OK)


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', '')

        if User.objects.filter(email=email).exists():
            user=User.objects.get(email=email)
            uidb64=urlsafe_base64_encode(smart_bytes(user.id))
            #hashing the user id 
            token=PasswordResetTokenGenerator().make_token(user) 
            #this token becomes invalid once the user has reset the password
            relative_link = reverse('password-reset-confirm',kwargs={'uidb64':uidb64,'token':token})
            abs_url = settings.FRONT_END_HOST + relative_link
            email_body = "Hiii! Use link below to reset your password \n"+ abs_url
            data ={'email_body': email_body, 'email_subject': "reset your password",'to_email':user.email}
            Util.send_email(data)
        return Response({'success': 'We have sent you a link to your email to reset your password'}, status=status.HTTP_200_OK)



class PasswordTokenCheckAPI(generics.GenericAPIView):

    def get(self,request,uidb64,token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return JsonResponse({'error':'Token is not valid, please request a new one'}, status = status.HTTP_401_UNAUTHORIZED)
            return JsonResponse({'success':True,'message':'Credentials Valid','uidb64':uidb64,'token':token}, status = status.HTTP_200_OK)
        except DjangoUnicodeDecodeError as identifier:
            if not PasswordResetTokenGenerator().check_token(user):
                return JsonResponse({'error': 'Token is not valid, please request a new one'}, status=status.HTTP_400_BAD_REQUEST)


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return JsonResponse({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'message':'Logged out successfully'},status=status.HTTP_204_NO_CONTENT)