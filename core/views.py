
# core/views.py
from django.shortcuts import render, redirect

def inicio(request):
    return render(request, 'core/landing.html')

def admin_login(request):
    return render(request, 'core/login.html')

def admin(request):    
    user_email = request.GET.get('email')
    if not user_email:
        return redirect('admin-login')
    
    context = {
        'user_email': user_email
    }
    #aqui quiero mostrar el email del usuario que se loguea
    print(f"User email: {user_email}") 
    return render(request, 'core/admin/dashboard.html', context)

def building_create(request):
    user_email = request.GET.get('email')
    if not user_email:
        # Si no hay email, nadie debería ver esta pantalla. Redirigimos al login.
        return redirect('admin-login')
    
    if request.method == 'POST':
        nombre = request.POST.get('nombre_edificio')
        direccion = request.POST.get('direccion')

        # Imprimimos en la consola de Django que recibimos los valores:
        print(f"Llegaron los datos del Edificio → ID: {nombre}, Nombre: {direccion}")

        contexto = {
            'mensaje_exito': "¡Se recibieron correctamente los datos!",
              'user_email': user_email,
        }
        return render(request, 'core/building/create.html', contexto)

    # Si es GET, simplemente renderizamos el formulario sin contexto especial.
    return render(request, 'core/building/create.html', { 'user_email': user_email })


def admin_crud(request):
    user_email = request.GET.get('email')
    if not user_email:
        # Si no hay email, nadie debería ver esta pantalla. Redirigimos al login.
        return redirect('admin-login')
    
    return render(request, 'core/admin/crud.html', { 'user_email': user_email })