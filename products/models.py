from django.db import models
from django.conf import settings
# # Create your models here.

def upload_path_handler(instance, filename):
    return "images/products/{title}/{file}".format(
        title=instance.name, file=filename
    )

UNIT_CHOICES=(
    ('kilogram','kg'),
    ('gram','g'),
    ('litre','l'),
    ('milli-litre','ml'),
    ('unit','unit'),
    
)


CATEGORY_CHOICES=(
    ('Exotic vegetable','Exotic vegetable'),
    ('Meat/Seafood','Meat/Seafood'),
    ('Daily essentials','Daily essentials'),
    ('Dairy Products','Dairy Products'),
    ('Healthy Food','Healthy Food'),
    ('fruits','fruits'),
    ('Indian Grocery','Indian Grocery'),
    ('Bakery Items','Bakery Items'),
)

class Product(models.Model):
    user           = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, null = True)
    company        = models.CharField(max_length = 200,null = False, blank = False)
    name           = models.CharField(max_length = 200,null = False, blank = False)
    image          = models.ImageField(upload_to=upload_path_handler)
    price          = models.DecimalField(max_digits = 7, decimal_places = 2) #should be written per kg
    createdAt      = models.DateTimeField(auto_now_add = True)
    category       = models.CharField(max_length=255,choices=CATEGORY_CHOICES,default='') #for setting a new order values just user update
    min_quantity   = models.IntegerField() #for setting a new order values just user update
    below_min_dis  = models.CharField(max_length = 5) #should be written per kg
    total_stock    = models.IntegerField() #for setting a new order values just user update
    above_min_dis  = models.CharField(max_length = 5) #should be written per kg
    units          = models.CharField(max_length=255,choices=UNIT_CHOICES,default='kilogram') #for setting a new order values just user update
    countInStock   = models.IntegerField(default=0)
    published      = models.BooleanField(default=True)
    def __str__(self):
        return self.name



class Address(models.Model):
    user          = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name = 'location', null = True)
    address       = models.CharField(max_length = 200)
    city          = models.CharField(max_length=255)
    pinCode       = models.CharField(max_length = 200)
    state         = models.CharField(max_length=255)
    country       = models.CharField(max_length=255)
    
    def __str__(self):
        return self.pinCode



# class Order(models.Model):
#     id            = models.IntegerField(primary_key=True)
#     user          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name = 'cart')
#     date_ordered  = models.DateTimeField(auto_now_add=True)
#     complete      = models.BooleanField(default=False)

#     def __str__(self):
#         return self.user

# class orderItems(models.Model):
#     id            = models.IntegerField(primary_key=True)
#     user          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name = 'cartItem')
#     order         = models.ForeignKey(Order, on_delete = models.CASCADE)
#     items         = models.ForeignKey(Order, on_delete = models.CASCADE)