from rest_framework import serializers
from .models import RawMaterial, Product, Category, Stock, Warehouse


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'description')


class RawMaterialSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category',
                                                     write_only=True)

    class Meta:
        model = RawMaterial
        fields = ('id', 'category', 'category_id', 'name', 'width', 'length', 'remaining_quantity')


class ProductSerializer(serializers.ModelSerializer):
    price = serializers.FloatField()
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category',
                                                     write_only=True)

    class Meta:
        model = Product
        fields = ('id', 'category', 'category_id', 'code', 'description', 'size', 'price', 'quantity_in_stock')


class StockSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product',
                                                     write_only=True)

    class Meta:
        model = Stock
        fields = ('id', 'product', 'product_id', 'warehouse', 'quantity')


class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ('id', 'name', 'location', 'description')

