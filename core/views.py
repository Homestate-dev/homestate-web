
# core/views.py
from django.shortcuts import render

def inicio(request):
    return render(request, 'core/landing.html')

def admin_login(request):
    return render(request, 'core/login.html')

def admin(request):
    user_email = request.GET.get('email')
    
    context = {
        'user_email': user_email
    }
    #aqui quiero mostrar el email del usuario que se loguea
    print(f"User email: {user_email}") 
    return render(request, 'core/admin/dashboard.html', context)