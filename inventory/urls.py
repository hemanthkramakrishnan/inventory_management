from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RawMaterialViewSet, ProductViewSet, CategoryViewSet, StockViewSet, WarehouseViewSet
router = DefaultRouter()
router.register(r'raw_materials', RawMaterialViewSet)
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'stock', StockViewSet)
router.register(r'warehouses', WarehouseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]