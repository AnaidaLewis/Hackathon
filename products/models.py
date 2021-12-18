# from django.db import models
# from django.conf import settings
# # Create your models here.

# def upload_path_handler(instance, filename):
#     return "images/products/{title}/{file}".format(
#         title=instance.name, file=filename
#     )

# UNIT_CHOICES=(
#     ('kilogram','kg'),
#     ('gram','g'),
#     ('litre','l'),
#     ('milli-litre','ml'),
#     ('unit','unit'),
    
# )


# CATEGORY_CHOICES=(
# )

# class Item(models.Model):
#     id             = models.IntegerField(primary_key=True)
#     user           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE)
#     name           = models.CharField(max_length = 200,null = False, blank = False)
#     image          = models.ImageField(upload_to=upload_path_handler)
#     price          = models.DecimalField(max_digits = 7, decimal_places = 2)
#     createdAt      = models.DateTimeField(auto_now_add = True)
#     # quantity       = models.CharField(max_digits = 5)
#     units          = models.CharField(max_length=255,choices=UNIT_CHOICES,default='kilogram')
#     category       = models.CharField(max_length=255,choices=CATEGORY_CHOICES,default='')

#     def __str__(self):
#         return self.name


# STATE_CHOICES=()

# class EventAddress(models.Model):
#     user          = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name = 'location', null = True)
#     address       = models.CharField(max_length = 200)
#     city          = models.CharField(max_length=255)
#     pinCode       = models.CharField(max_length = 200)
#     state         = models.CharField(max_length=255)
#     country       = models.CharField(max_length=255)
    
#     def __str__(self):
#         return self.pinCode


    
