from django.urls import path
from .views import AddressList
urlpatterns = [
    path('address/', AddressList.as_view(), name="Address"),
]