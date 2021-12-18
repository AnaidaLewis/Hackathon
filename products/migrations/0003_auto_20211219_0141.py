# Generated by Django 3.2.9 on 2021-12-18 20:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import products.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0002_auto_20211219_0010'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=200)),
                ('image', models.ImageField(upload_to=products.models.upload_path_handler)),
                ('price', models.DecimalField(decimal_places=2, max_digits=7)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('category', models.CharField(choices=[('Exotic vegetable', 'Exotic vegetable'), ('Meat/Seafood', 'Meat/Seafood'), ('Daily essentials', 'Daily essentials'), ('Dairy Products', 'Dairy Products'), ('Healthy Food', 'Healthy Food'), ('fruits', 'fruits'), ('Indian Grocery', 'Indian Grocery'), ('Bakery Items', 'Bakery Items')], default='', max_length=255)),
                ('min_quantity', models.IntegerField()),
                ('below_min_dis', models.CharField(max_length=5)),
                ('total_stock', models.IntegerField()),
                ('above_min_dis', models.CharField(max_length=5)),
                ('units', models.CharField(choices=[('kilogram', 'kg'), ('gram', 'g'), ('litre', 'l'), ('milli-litre', 'ml'), ('unit', 'unit')], default='kilogram', max_length=255)),
                ('countInStock', models.IntegerField(default=0)),
                ('published', models.BooleanField(default=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='address',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='location', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Item',
        ),
    ]
