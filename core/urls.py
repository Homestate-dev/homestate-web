
# core/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('admin-login/', views.admin_login, name='admin-login'),
    path('admin/', views.admin, name='admin'),
]
