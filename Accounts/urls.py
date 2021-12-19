from django.urls import path
from .views import GoogleSocialAuthView, Login, LogoutAPIView, SignUp, VerifyEmail, PasswordTokenCheckAPI, RequestPasswordResetEmail,SetNewPasswordAPIView, VerifyPhone, TwoStep, sendTwoStep,BuyerOrSeller
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', SignUp.as_view(), name="SignUp"),
    path('email-verify/', VerifyEmail.as_view(), name="EmailVerification"),
    path('login/', Login.as_view(), name="Login"),
     path('logout/', LogoutAPIView.as_view(), name="logout"),
    path('token-refresh/',TokenRefreshView.as_view(),name="RefreshToken"),
    path('google/', GoogleSocialAuthView.as_view()),
    # path('facebook/', FacebookSocialAuthView.as_view()),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(), name = "password-reset-confirm"),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(),name='password-reset-complete'),

    path('phone-verify/', VerifyPhone.as_view(), name = "verifyPhone"),
    path('send-twostep/', sendTwoStep.as_view(), name = "SendTwoStep"),
    path('twostep-verify/', TwoStep.as_view(), name = "TwoStep"),
    path('buyer-seller/', BuyerOrSeller.as_view(), name = "BuyerOrSeller"),
]