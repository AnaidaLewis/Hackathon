from django.db import models

from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager)
import rest_framework
from rest_framework_simplejwt.tokens import RefreshToken

# Create your models here.


class UserManager(BaseUserManager):
    def create_superuser(self, email, phone,Role, password=None, is_active=True, is_staff=True, is_admin=True, is_verified=True, is_verifiedPhone=True, is_nottwostep=True):
        if not email:
            raise ValueError("User must have an email address")
        if not phone:
            raise ValueError("User must have a phone number")
        if not password:
            raise ValueError("User must have an password")
        user_obj = self.model(
            email = self.normalize_email(email),
        )
        user_obj.set_password(password)
        user_obj.phone = phone
        user_obj.Role =  Role
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.active = is_active
        user_obj.verified = is_verified
        user_obj.verifiedPhone = is_verifiedPhone
        user_obj.nottwostep=is_nottwostep
        user_obj.save(using=self._db)
        return user_obj

    def create_staffuser(self, email, phone, Role, password=None):
        user = self.create_superuser(
            email,
            phone,
            Role,
            password=password,
            is_admin=False
        )
        return user
    
    def create_user(self, email, phone, Role, nottwostep, password=None):
        user = self.create_superuser(
            email,
            phone,
            password=password,
            is_admin=False,
            is_staff=False,
            is_active=True,
            is_verified=False,
            is_verifiedPhone=False,
            is_nottwostep= not nottwostep,
            Role = Role

        )
        return user

    
AUTH_PROVIDERS = {
    'google': 'google',
    'email': 'email'
}

ROLE_CHOICES=(
    ('BUYER','BUYER'),
    ('SELLER','SELLER'),
    
)

class User(AbstractBaseUser):

    email             = models.EmailField(max_length=255, unique=True)
    phone             = models.CharField(max_length=15, unique=True)
    active            = models.BooleanField(default=False)
    staff             = models.BooleanField(default=False)
    admin             = models.BooleanField(default=False)
    verified          = models.BooleanField(default=False)
    verifiedPhone     = models.BooleanField(default=False)
    nottwostep        = models.BooleanField(default=True)
    login2stepverify  = models.BooleanField(default=True)
    Role              = models.CharField(max_length=255,choices=ROLE_CHOICES,default='BUYER')
    auth_provider  = models.CharField(
        max_length=255, blank=False,
        null=False, default=AUTH_PROVIDERS.get('email'))

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['phone','Role']

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_module_perms(self, app_label):
        return True

    def has_perm(self, app_label):
        return True

    @property
    def is_admin(self):
        return self.admin

    @property   #https://stackoverflow.com/questions/58558989/what-does-djangos-property-do
    def is_staff(self):
        return self.staff

    @property
    def is_active(self):
        return self.active

    @property
    def is_verified(self):
        return self.verified

    @property
    def is_verifiedPhone(self):
        return self.verifiedPhone

    @property
    def is_nottwostep(self):
        return self.nottwostep

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }