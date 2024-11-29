# warehouse/models.py
from django.db import models


class Warehouse(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Stock(models.Model):
    warehouse = models.ForeignKey(Warehouse, related_name='stocks', on_delete=models.CASCADE)
    product = models.CharField(max_length=100)  # Adjust this field as needed for your product details
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.product} - {self.warehouse.name}"
