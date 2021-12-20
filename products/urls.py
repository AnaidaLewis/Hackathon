from django.urls import path
from .views import AddressList, ProductList,BuyerCart,PlaceOrder, SellerViewOrder,AllProducts,BuyerHistory
urlpatterns = [
    path('address/', AddressList.as_view(), name="Address"),
    path('all-product/',AllProducts.as_view(), name="AllProduct"),
    path('product/<int:pk>/', ProductList.as_view(), name="Product"),
    path('cart/<int:pk>/', BuyerCart.as_view(), name="BuyerCart"),
    path('cart-history/', BuyerHistory.as_view(), name="BuyerHistory"),
    path('place-order/', PlaceOrder.as_view(), name="BuyerCart"),
    path('seller-view-order/<int:pk>/', SellerViewOrder.as_view(), name="SellerViewOrder"),
]