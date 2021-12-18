from django.shortcuts import render
from rest_framework import (mixins, generics, status, permissions)
from rest_framework.views import APIView
from django.http.response import Http404, HttpResponse, JsonResponse
from rest_framework.permissions import IsAuthenticated
from products.serializers import ItemSerializer, AddressSerializer
from .models import Item,Address
from django.contrib.auth import get_user_model
# Create your views here.

User = get_user_model()

class AddressList(APIView):
    
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user = User.objects.get(email = request.user)
        try:
	        address = Address.objects.get(user = user.id)
        except Address.DoesNotExist:
            content = {'detail': 'Address not created'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        serializer = AddressSerializer(address, many=False)
        return JsonResponse(serializer.data, status = status.HTTP_200_OK)
        

    def post(self,request):
        user = User.objects.get(email = request.user)
        try:
	        address = Address.objects.get(user = user.id)
        except Address.DoesNotExist:
            address_user = Address(user = user)
            serializer = AddressSerializer(address_user,data=request.data)
            if serializer.is_valid():
                user_address = serializer.save()
                return JsonResponse(serializer.data, status = status.HTTP_202_ACCEPTED)
            return JsonResponse(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        content = {'detail': 'Address already created'}
        return JsonResponse(content, status = status.HTTP_200_OK)


    def put(self, request):
        user = User.objects.get(email = request.user)
        try:
	        address = Address.objects.get(user = user.id)

        except Address.DoesNotExist:
            content = {'detail': 'Address not created'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        serializer = AddressSerializer(instance = address, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = status.HTTP_202_ACCEPTED)
        return JsonResponse(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    
    def delete(self, request):
        user = User.objects.get(email = request.user)
        try:
	        address = Address.objects.get(user = user.id)
        except Address.DoesNotExist:
            content = {'detail': 'Address not created'}
            return JsonResponse(content, status = status.HTTP_404_NOT_FOUND)
        address.delete()
        return JsonResponse({'Response': 'Address succsesfully delete!'},status = status.HTTP_200_OK)
