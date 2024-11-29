# warehouse/views.py
from rest_framework import viewsets
from .models import Warehouse, Stock
from .serializers import WarehouseSerializer, StockSerializer


class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
