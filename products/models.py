from django.db import models
from django.conf import settings
# # Create your models here.

def upload_path_handler(instance, filename):
    return "images/products/{title}/{file}".format(
        title=instance.name, file=filename
    )

UNIT_CHOICES=(
    ('kg','kg'),
    ('g','g'),
    ('l','l'),
    ('ml','ml'),
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
    wholesale_price  = models.DecimalField(max_digits = 7, decimal_places = 2)
    min_order      = models.IntegerField() #for setting a new order values just user update
    total_stock    = models.IntegerField() #for setting a new order values just user update
    products_ordered = models.IntegerField(default=0)
    category       = models.CharField(max_length=255,choices=CATEGORY_CHOICES) #for setting a new order values just user update
    units          = models.CharField(max_length=255,choices=UNIT_CHOICES) #for setting a new order values just user update
    # published      = models.BooleanField(default = True)
    createdAt      = models.DateTimeField(auto_now_add = True)
    
    def __str__(self):
        return self.name

    def leftInStock(self):
        return self.total_stock - self.products_ordered

class Address(models.Model):
    user          = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, null = True)
    address       = models.CharField(max_length = 200)
    city          = models.CharField(max_length=255)
    pinCode       = models.CharField(max_length = 200)
    state         = models.CharField(max_length=255)
    country       = models.CharField(max_length=255)
    
    def __str__(self):
        return self.pinCode



class Cart(models.Model):
    user           = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name = 'cart',null = True)
    totalCartItem  = models.IntegerField(default=0)
    totalCartItemFromSameManufacturer  = models.IntegerField(default=0)
    manufacturer_name = models.CharField(max_length = 200, blank = True, default = 'A')
    # ItemFromSameManufacturerDiscount  = models.DecimalField(max_digits=7, decimal_places=2, default = 0)
    taxPrice       = models.DecimalField(max_digits = 7, decimal_places = 2, default = 18)
    final_price    = models.DecimalField(max_digits=7, decimal_places=2,default = 0)
    isPaid         = models.BooleanField(default = False)
    paidAt         = models.DateTimeField(auto_now_add = False, null = True, blank = True)
    isDelivered    = models.BooleanField(default = False)
    deliveredAt    = models.DateTimeField(auto_now_add = False, null = True, blank = True)
    createdAt      = models.DateTimeField(auto_now_add = True, blank = False)

    def __str__(self):
        return str(self.user)



class CartItem(models.Model):
    cart          = models.ForeignKey(Cart, on_delete = models.CASCADE, null = True)
    item          = models.ForeignKey(Product, on_delete = models.CASCADE, null = True)
    qty           = models.IntegerField(blank = False)
    wholesale_price= models.BooleanField(default = False)
    price         = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return str(self.item)