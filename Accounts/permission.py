from django.core.checks import messages
from rest_framework import permissions
from django.contrib.auth import get_user_model

User = get_user_model()

class EmailVerifiedPermission(permissions.BasePermission):
    message = 'Email not verified'

    def has_permission(self,request,view):
        try:
            user = User.objects.get(email = request.user)
            if user.is_verified:
                return True
            return False
        except:
            return False
        
