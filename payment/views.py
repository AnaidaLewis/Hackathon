from django.shortcuts import render, redirect
import os
from products.models import Cart, CartItem, Address
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from products.serializers import CartSerializer
from rest_framework.permissions import IsAuthenticated
from . import Checksum

from django.contrib.sites.shortcuts import get_current_site

from decouple import config


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def initialise_payment(request, pk):
    try:
	    cart = Cart.objects.get(id=pk)
    except Cart.DoesNotExist:
        return Response({'detail':'Invalid Id'},status = status.HTTP_404_NOT_FOUND)
    try:
        cart = Cart.objects.get(id=pk, user = request.user)
    except Cart.DoesNotExist:
        return Response({'Response': "You do not have permisssion to view this order"},status = status.HTTP_404_NOT_FOUND)
    try:
        add = Address.objects.get(user = request.user)
    except Address.DoesNotExist:
        return Response({'Response': "Address not created for this order"},status = status.HTTP_404_NOT_FOUND)
    serializer = CartSerializer(cart, many=False)
    print(cart.id)
    print(serializer.data)
    print(request.user)
    order_id = Checksum.__id_generator__()
    param_dict = {
        'MID': config('MERCHANT_ID'),
        'ORDER_ID': order_id,
        'TXN_AMOUNT': str(serializer.data['totalPrice']),
        'CUST_ID': str(serializer.data['user']),
        'INDUSTRY_TYPE_ID': 'Retail',
        'WEBSITE': 'WEBSTAGING',
        'CHANNEL_ID': 'WEB',
        'CALLBACK_URL': str(get_current_site(request).domain) +'payment/handle-request/' + str(cart.id) + '/',
        # CAllback_url is where paytm will send a post request to confirm payment
    }
    #this creates a new checksum (unique hashed string) using our merchant key with every paytm payment
    param_dict['CHECKSUMHASH'] = Checksum.generate_checksum(param_dict,config('MERCHANT_KEY'))
    return render(request, 'paytm/checkout.html', {'param_dict':param_dict})
 

# Create your views here.
@csrf_exempt
# @api_view(['POST'])
def handlerequest(request, pk):
    #paytm will send a post request here
    cart = Cart.objects.get(id = pk)
    form = request.POST
    response_dict = {}
    for i in form.keys():
        response_dict[i] = form[i]
        if i == 'CHECKSUMHASH':
            checksum = form[i]
    print(response_dict)
    verify = Checksum.verify_checksum(response_dict, config('MERCHANT_KEY'), checksum)
    if verify:
        if response_dict['RESPCODE'] == '01':
            cart.isPaid = True
            cart.save()
            #the 01 code is a paytm code for successful transaction
            print('order successful')
        else:
            print('order was unsuccessful because ' + response_dict['RESPMSG'])
        return render(request, 'paytm/paymentstatus.html',{'response':response_dict})