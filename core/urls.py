
# core/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('admin-login/', views.admin_login, name='admin-login'),
    path('admin/', views.admin, name='admin'),
    path('building/create/', views.building_create, name='building-create'),
    path('admin/crud/', views.admin_crud, name='admin-crud'),
]
