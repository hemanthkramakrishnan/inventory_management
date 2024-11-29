# warehouse/serializers.py
from rest_framework import serializers
from .models import Warehouse, Stock


class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ('id', 'name', 'location', 'description')


class StockSerializer(serializers.ModelSerializer):
    warehouse = WarehouseSerializer(read_only=True)

    class Meta:
        model = Stock
        fields = ('id', 'warehouse', 'product', 'quantity')
