# Generated by Django 5.0.6 on 2024-06-03 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0004_remove_stock_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='size',
            field=models.IntegerField(default=0),
        ),
    ]
