from django.shortcuts import render


def inicio(request):
    return render(request, 'core/base.html')

def login(request):
    return render(request, 'core/login.html')