# inventory/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),

    path('categories/', views.category_list, name='category_list'),
    path('category/add/', views.category_add, name='category_add'),
    path('category/edit/<int:pk>/', views.category_edit, name='category_edit'),
    path('category/delete/<int:pk>/', views.category_delete, name='category_delete'),

    path('products/', views.product_list, name='product_list'),
    path('product/add/', views.product_add, name='product_add'),
    path('product/edit/<int:pk>/', views.product_edit, name='product_edit'),
    path('product/delete/<int:pk>/', views.product_delete, name='product_delete'),

    path('tailors/', views.tailor_list, name='tailor_list'),
    path('tailors/add/', views.tailor_add, name='tailor_add'),
    path('tailors/edit/<int:pk>/', views.tailor_edit, name='tailor_edit'),
    path('tailors/delete/<int:pk>/', views.tailor_delete, name='tailor_delete'),

    path('warehouses/', views.warehouse_list, name='warehouse_list'),
    path('warehouses/add/', views.warehouse_add, name='warehouse_add'),
    path('warehouses/edit/<int:pk>/', views.warehouse_edit, name='warehouse_edit'),
    path('warehouses/delete/<int:pk>/', views.warehouse_delete, name='warehouse_delete'),

    path('stocks/', views.stock_list, name='stock_list'),
    path('stock/add/', views.stock_add, name='stock_add'),
    path('stock/edit/<int:pk>/', views.stock_edit, name='stock_edit'),
    path('stock/delete/<int:pk>/', views.stock_delete, name='stock_delete'),

    path('outgoing_stock/', views.outgoing_stock_list, name='outgoing_stock_list'),
    path('outgoing_stock/add/', views.outgoing_stock_add, name='outgoing_stock_add'),
    path('outgoing_stock/edit/<int:pk>/', views.outgoing_stock_edit, name='outgoing_stock_edit'),
    path('outgoing_stock/delete/<int:pk>/', views.outgoing_stock_delete, name='outgoing_stock_delete'),

    path('incoming_stock/add/', views.incoming_stock_add, name='incoming_stock_add'),
    path('incoming_stock/log/', views.incoming_stock_log, name='incoming_stock_log'),
    path('outgoing_stock/log/', views.outgoing_stock_log, name='outgoing_stock_log'),
]

