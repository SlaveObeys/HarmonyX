from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('productos.urls')),

    # Ruta para loguearse
    path("accounts/", include("django.contrib.auth.urls")),
]
