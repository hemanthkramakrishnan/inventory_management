from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class RawMaterial(models.Model):
    category = models.ForeignKey(Category, related_name='raw_materials', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    width = models.FloatField()  # Width in meters
    length = models.FloatField()  # Length in meters
    remaining_quantity = models.FloatField()  # Remaining length in meters

    def __str__(self):
        return f"{self.name} ({self.remaining_quantity}m left)"


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    code = models.CharField(unique=True, blank=True, max_length=20)
    size = models.IntegerField(default=0)
    description = models.TextField(blank=True, null=True)
    price = models.FloatField(default=0)
    quantity_in_stock = models.PositiveIntegerField(default=0)  # Total quantity in all warehouses

    def __str__(self):
        return f"{self.description} (Code: {self.code} Size: {self.size}cm {self.quantity_in_stock} pcs in stock)"

    def update_quantity_in_stock(self):
        total_quantity = Stock.objects.filter(product=self).aggregate(models.Sum('quantity'))['quantity__sum']
        self.quantity_in_stock = total_quantity if total_quantity is not None else 0
        self.save()


class Warehouse(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Stock(models.Model):
    product = models.ForeignKey(Product, related_name='stock_entries', on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, related_name='stock', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.product.description} - {self.quantity} units in {self.warehouse.name}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.product.update_quantity_in_stock()
