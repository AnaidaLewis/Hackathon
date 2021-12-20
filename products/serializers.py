from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product,Address,Cart,CartItem

User = get_user_model()

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['qty']

class DisplayCartItemSerializer(serializers.ModelSerializer):
    # message = serializers.CharField(read_only = True, default = "None")
    class Meta:
        model = CartItem
        # fields = ['cart', 'item', 'qty', 'wholesale_price', 'fixed', 'price', 'message']
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class SellerAllOrdersViewSerializer(serializers.Serializer):
    Quantity = serializers.CharField()
    Address = serializers.CharField()
    Cart = serializers.CharField()
    finalPrice = serializers.CharField()


class ResetProductsOrderedSerializer(serializers.Serializer):
    totalAggregateQuantity = serializers.IntegerField(required = True)

class ProductInCartSerializer(serializers.Serializer):
    ProductInCart = serializers.CharField()
    