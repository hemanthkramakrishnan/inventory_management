from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StaffViewSet, ManagerViewSet

router = DefaultRouter()
router.register(r'staff', StaffViewSet)
router.register(r'managers', ManagerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]