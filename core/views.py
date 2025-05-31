
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

def building_create(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre_edificio')
        direccion = request.POST.get('direccion')

        # Imprimimos en la consola de Django que recibimos los valores:
        print(f"Datos recibidos para crear edificio → Nombre: {nombre}, Dirección: {direccion}")

        contexto = {
            'mensaje_exito': "¡Se recibieron correctamente los datos!",
        }
        return render(request, 'core/building/create.html', contexto)

    # Si es GET, simplemente renderizamos el formulario sin contexto especial.
    return render(request, 'core/building/create.html')