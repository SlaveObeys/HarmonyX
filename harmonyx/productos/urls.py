from django.urls import path, include
from . import views

urlpatterns = [
    # Rutas para las páginas del usuario
    path('', views.index, name='index'),
    path('nuestrosProductos', views.nuestrosProductos, name='nuestrosProductos'),
    path('contacto', views.contacto, name='contacto'),
    path('iniciarSesion', views.iniciarSesion, name='iniciarSesion'),
    path('registrarCuenta', views.registrarCuenta, name='registrarCuenta'),
    path('checkout', views.checkout, name='checkout'),
    
    # Rutas para los productos
    path('crudProductos', views.crudProductos, name='crud'),
    path('agregarProducto', views.productosAdd, name='productosAdd'),
    path('eliminarProducto/<str:pk>', views.productosDel, name='productosDel'),
    path('editarProducto/<str:pk>', views.productosFindEdit, name='productosFindEdit'),
    path('productoUpdate', views.productosUpdate, name='productosUpdate'),

    # Rutas para los artistas
    path('crudArtistas', views.crudArtistas, name='crudArtistas'),
    path('agregarArtista', views.artistasAdd, name='artistasAdd'),
    path('eliminarArtista/<str:pk>', views.artistasDel, name='artistasDel'),
    path('editarArtista/<str:pk>', views.artistasEdit, name='artistasEdit'),

    # Rutas para login y logout
    path('logoutAccount', views.logoutAccount, name='logoutAccount')
]