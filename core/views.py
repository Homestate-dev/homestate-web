
# core/views.py
# core/views.py
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

def inicio(request):
    return render(request, 'core/base.html')

def admin_login(request):
    if request.user.is_authenticated:
        return redirect('admin-dashboard')
    return render(request, 'core/login.html')

@login_required(login_url='admin-login')
def admin_dashboard(request):
    return render(request, 'core/admin/dashboard.html')