from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
# for reseting password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from . import google
from . import facebook
# from Accounts.google import Google
from decouple import config

#phone verification
from . import verifyPhone

#two step
from django.urls import reverse
from django.conf import settings

from Accounts.register import register_social_user

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    twostep = serializers.BooleanField()
    class Meta:
        model = User
        fields = ['email', 'phone', 'password','twostep','Role']
    
    def save_user(self, validated_data):
        user = User.objects.create_user( 
                                password=validated_data.get('password'), 
                                email=validated_data.get('email'),
                                phone=validated_data.get('phone'),
                                nottwostep=validated_data.get('twostep'),
                                Role = validated_data.get('Role'))
        user.save()
        return user


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=666)

    class Meta:
        model = User
        fields = ['token']


class PhoneVerificationSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6)
    phone= serializers.CharField(max_length=15)

    class Meta:
        fields = ['phone','code']


class SendTwoStepVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=666)

    class Meta:
        model = User
        fields = ['token']


class TwoStepVerificationSerializer(serializers.ModelSerializer):
    code = serializers.CharField(max_length=6)
    class Meta:
        model = User
        fields = ['code']


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=3)
    tokens = serializers.CharField(max_length=68, min_length=8, read_only=True)

    class Meta:
        model=User
        fields = ['email', 'password', 'tokens']

    def validate(self, attrs):

        email = attrs.get('email','')
        password = attrs.get('password', '')

        filtered_user_by_email = User.objects.filter(email=email)
        auth_user = auth.authenticate(email=email, password=password)

        if filtered_user_by_email.exists() and filtered_user_by_email[0].auth_provider != 'email':
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

        if not auth_user:
            raise AuthenticationFailed("Invalid credentials, try again")
        if not auth_user.is_active:
            raise AuthenticationFailed("Account Disabled, contact admin")
        if not auth_user.is_verified:
            raise AuthenticationFailed("Email not verified yet")
        if not auth_user.is_verifiedPhone:
            raise AuthenticationFailed("Phone not verified yet")
        if not auth_user.is_nottwostep:
            auth_user.login2stepverify = False
            auth_user.save()
            # raise AuthenticationFailed("Two step verification enabled, go to twostep view to login")
        tokens = RefreshToken.for_user(user=auth_user)
        relative_link = reverse('TwoStep')
        access_token = str(tokens.access_token)
        abs_url = "https://community-buying.herokuapp.com" + relative_link 
        return {
            'email': auth_user.email,
            'refresh': str(tokens),
            'access': access_token,
            'is two step enabled': not auth_user.is_nottwostep,
            'two step':abs_url
        }


class GoogleSocialAuthSerializer(serializers.Serializer):
    auth_token = serializers.CharField()

    def validate_auth_token(self, auth_token):
        user_data = google.Google.validate(auth_token)
        try:
            user_data['sub']
        except:
            raise serializers.ValidationError(
                'The token is invalid or expired. Please login again.'
            )

        if user_data['aud'] != config('GOOGLE_CLIENT_ID'):

            raise AuthenticationFailed('oops, who are you?')

        user_id = user_data['sub']
        email = user_data['email']
        provider = 'google'

        return register_social_user(
            provider=provider, user_id=user_id, email=email)


# class FacebookSocialAuthSerializer(serializers.Serializer):
#     """Handles serialization of facebook related data"""
#     auth_token = serializers.CharField()

#     def validate_auth_token(self, auth_token):
#         user_data = facebook.Facebook.validate(auth_token)

#         try:
#             user_id = user_data['id']
#             email = user_data['email']
#             name = user_data['name']
#             provider = 'facebook'
#             return register_social_user(
#                 provider=provider,
#                 user_id=user_id,
#                 email=email,
#                 name=name
#             )
#         except Exception as identifier:

#             raise serializers.ValidationError(
#                 'The token  is invalid or expired. Please login again.'
#             )


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    # redirect_url = serializers.CharField(max_length=500, required=False)
    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)
            user.set_password(password)
            user.save()
            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):

        try:
            RefreshToken(self.token).blacklist()

        except TokenError:
            self.fail('bad_token')