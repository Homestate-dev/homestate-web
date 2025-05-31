
# core/views.py
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

def inicio(request):
    return render(request, 'core/base.html')

def admin_login(request):
    return render(request, 'core/login.html')

def admin(request):
    return render(request, 'core/admin/dashboard.html')