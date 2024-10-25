# inventory/admin.py
from django.contrib import admin
from .models import Category, Product, Tailor, Warehouse, Stock, OutgoingStock, OutgoingLog, IncomingStock

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Tailor)
admin.site.register(Warehouse)
admin.site.register(Stock)
admin.site.register(OutgoingStock)
admin.site.register(OutgoingLog)
admin.site.register(IncomingStock)
