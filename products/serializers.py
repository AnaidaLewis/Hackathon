from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Item,Address

User = get_user_model()

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
