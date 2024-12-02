from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import RawMaterial, Product, Category, Stock, Warehouse
from .serializers import RawMaterialSerializer, ProductSerializer, CategorySerializer, StockSerializer, WarehouseSerializer


class RawMaterialViewSet(viewsets.ModelViewSet):
    queryset = RawMaterial.objects.all()
    serializer_class = RawMaterialSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer


class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer

    @action(detail=True, methods=['get'])
    def stock(self, request, pk=None):
        warehouse = self.get_object()
        stock_items = Stock.objects.filter(warehouse=warehouse)
        serializer = StockSerializer(stock_items, many=True)
        return Response(serializer.data)
