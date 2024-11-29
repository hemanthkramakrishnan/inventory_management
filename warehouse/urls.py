# warehouse/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WarehouseViewSet, StockViewSet

router = DefaultRouter()
router.register(r'warehouses', WarehouseViewSet)
router.register(r'stocks', StockViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
