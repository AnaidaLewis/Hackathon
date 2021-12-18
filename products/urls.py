from django.urls import path
from .views import AddressList, ProductList
urlpatterns = [
    path('address/', AddressList.as_view(), name="Address"),
    path('product/<int:pk>/', ProductList.as_view(), name="Product"),
]