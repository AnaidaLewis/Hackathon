from django.urls import path
from .views import AddressList, ProductList,BuyerCart,PlaceOrder
urlpatterns = [
    path('address/', AddressList.as_view(), name="Address"),
    path('product/<int:pk>/', ProductList.as_view(), name="Product"),
    path('cart/<int:pk>/', BuyerCart.as_view(), name="BuyerCart"),
    path('place-order/<int:pk>/', PlaceOrder.as_view(), name="BuyerCart"),
]