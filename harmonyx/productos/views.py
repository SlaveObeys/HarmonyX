from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout, login

from .models import Producto, Artista

from .forms import ArtistaForm

#################################### FUNCIONES LOGIN Y LOGOUT #############################################

def logoutAccount(request):
    logout(request)
    return redirect(index)

#################################### FUNCIONES PARA VISTAS DE LA PÁGINA DEL USUARIO #############################################


def index(request):
    productos = Producto.objects.all().order_by('nombre_album')
    context = {"productos": productos, 'currentPage': 'index'}
    return render(request, 'productos/index.html', context)


def nuestrosProductos(request):
    productos = Producto.objects.all().order_by('nombre_album')
    context = {"productos": productos, 'currentPage': 'nuestrosProductos'}
    return render(request, 'productos/nuestrosProductos.html', context)


def contacto(request):
    context = {'currentPage': 'contacto'}
    return render(request, 'productos/contacto.html', context)


def iniciarSesion(request):
    context = {'currentPage': 'iniciarSesion'}
    return render(request, 'productos/iniciarSesion.html', context)


def registrarCuenta(request):
    context = {'currentPage': 'registrarCuenta'}
    return render(request, 'productos/registrarCuenta.html', context)


def checkout(request):
    context = {'currentPage': 'checkout'}
    return render(request, 'productos/checkout.html', context)


def top100billboard(request):
    context = {'currentPage': 'top100billboard'}
    return render(request, 'productos/top100billboard.html', context)


#################################### FUNCIONES PARA EL CRUD DE PRODUCTOS #############################################
@login_required
def crudProductos(request):
    mensajeExist = request.session.pop('mensaje', None)
    mensaje = mensajeExist if mensajeExist else ""

    productos = Producto.objects.all().order_by('nombre_album')
    context = {"productos": productos,
               'currentPage': 'crudProductos', 'mensaje': mensaje}
    return render(request, 'productos/productos_lista.html', context)


@login_required
def productosAdd(request):
    if request.method != "POST":  # Si no se llama a la función desde un formulario mostramos la página agregar productos
        mensajeExist = request.session.pop('mensaje', None)
        mensaje = mensajeExist if mensajeExist else ""

        artistas = Artista.objects.all().order_by('nombre_artista')
        context = {"artistas": artistas, 'mensaje': mensaje}
        return render(request, 'productos/productos_add.html', context)
    else:  # Si se llama a la función desde un formulario
        try:
            sku = request.POST["sku"]
            nombre_album = request.POST["nombre_album"]
            precio = request.POST["precio"]
            fecha_lanzamiento = request.POST["fecha_lanzamiento"]
            nombre_artista = request.POST["nombre_artista"]
            nombre_img = request.POST["nombre_img"]
            tendencia = request.POST["tendencia"]

            if (tendencia == "Activado"):
                tendencia = True
            else:
                tendencia = False

            ojbArtista = Artista.objects.get(id_artista=nombre_artista)
            obj = Producto.objects.create(
                sku=sku,
                nombre_album=nombre_album,
                precio=precio,
                fecha_lanzamiento=fecha_lanzamiento,
                id_artista=ojbArtista,
                nombre_img=nombre_img,
                tendencia=tendencia
            )
            obj.save()

            request.session['mensaje'] = "¡Exito. El producto fue agregado a la base de datos!"
            return redirect(productosAdd)
        except:  # Si da error al agregar el producto, se le indica que hubo un error
            request.session['mensaje'] = "Error. Producto no fue agregado a la base de datos"
            return redirect(productosAdd)


@login_required
def productosDel(request, pk):
    try:
        producto = Producto.objects.get(sku=pk)
        producto.delete()
        request.session['mensaje'] = "Producto con SKU " + \
            pk + " a sido eliminado exitosamente"
        return redirect(crudProductos)
    except:
        request.session['mensaje'] = "Error. Producto con SKU " + \
            pk + " no existe en la base de datos"
        return redirect(crudProductos)


@login_required
def productosFindEdit(request, pk):
    mensajeExist = request.session.pop('mensaje', None)
    mensaje = mensajeExist if mensajeExist else ""
    try:
        if pk != "":
            producto = Producto.objects.get(sku=pk)
            artistas = Artista.objects.all().order_by('nombre_artista')

            producto.fecha_lanzamiento = producto.fecha_lanzamiento.strftime(
                '%Y-%m-%d')

            context = {'producto': producto,
                       'artistas': artistas, 'mensaje': mensaje}
            return render(request, 'productos/productos_edit.html', context)
    except:  # Si no se encuentra el producto en la base de datos se le indica al usuario
        request.session['mensaje'] = "Error. No se encontró un producto con el SKU " + \
            pk + " ingresado"
        return redirect(crudProductos)


@login_required
def productosUpdate(request):
    if request.method == "POST":  # Si se llama a la función desde un formulario
        sku = request.POST["sku"]
        nombre_album = request.POST["nombre_album"]
        precio = request.POST["precio"]
        fecha_lanzamiento = request.POST["fecha_lanzamiento"]
        nombre_artista = request.POST["nombre_artista"]
        nombre_img = request.POST["nombre_img"]
        tendencia = request.POST["tendencia"]

        if tendencia == "Activado":
            tendencia = True
        else:
            tendencia = False

        objArtista = Artista.objects.get(id_artista=nombre_artista)

        producto = Producto.objects.get(sku=sku)
        producto.sku = sku
        producto.nombre_album = nombre_album
        producto.precio = precio
        producto.fecha_lanzamiento = fecha_lanzamiento
        producto.id_artista = objArtista
        producto.nombre_img = nombre_img
        producto.tendencia = tendencia
        producto.save()

        request.session['mensaje'] = "¡Exito. El producto fue actualizado!"
        return redirect(productosFindEdit, sku)
    else:  # Si no se llama a la función desde un formulario
        return redirect(crudProductos)

#################################### FUNCIONES PARA EL CRUD DE ARTISTAS #############################################


@login_required
def crudArtistas(request):
    mensajeExist = request.session.pop('mensaje', None)
    mensaje = mensajeExist if mensajeExist else ""

    artistas = Artista.objects.all().order_by('id_artista')
    context = {"artistas": artistas,
               'currentPage': 'crudArtistas', 'mensaje': mensaje}
    return render(request, 'productos/artistas_lista.html', context)


@login_required
def artistasAdd(request):
    if request.method == "POST":  # Si se llama a la función desde un formulario
        try:
            form = ArtistaForm(request.POST)
            if form.is_valid:
                form.save()
                form = ArtistaForm()

            request.session['mensaje'] = "¡Exito. El artista fue agregado a la base de datos!"
            return redirect(artistasAdd)
        except ValueError:
            request.session['mensaje'] = "Error. Datos ingresados no son válidos, intenta nuevamente"
            return redirect(artistasAdd)
        except:
            request.session['mensaje'] = "Error. Artista no fue agregado a la base de datos"
            return redirect(artistasAdd)
    else:  # Si no se llama al método desde un formulario
        mensajeExist = request.session.pop('mensaje', None)
        mensaje = mensajeExist if mensajeExist else ""

        form = ArtistaForm()
        context = {"form": form, 'mensaje': mensaje}
        return render(request, 'productos/artistas_add.html', context)


@login_required
def artistasDel(request, pk):
    try:
        artista = Artista.objects.get(id_artista=pk)
        artista.delete()
        request.session['mensaje'] = "Artista con ID " + \
            pk + " a sido eliminado exitosamente"
        return redirect(crudArtistas)
    except:
        request.session['mensaje'] = "Error. Artista con ID " + \
            pk + " no existe en la base de datos"
        return redirect(crudArtistas)


@login_required
def artistasEdit(request, pk):
    mensajeExist = request.session.pop('mensaje', None)
    mensaje = mensajeExist if mensajeExist else ""

    try:
        artista = Artista.objects.get(id_artista=pk)
        if artista:
            if request.method == "POST":  # Si se llama al método desde un formulario
                form = ArtistaForm(request.POST, instance=artista)
                if form.is_valid:
                    form.save()
                    form = ArtistaForm()
                request.session['mensaje'] = "¡Exito. El artista fue actualizado en la base de datos!"
                return redirect(artistasEdit, pk)
            else:  # Si se llama la función para ver la página editar artista
                form = ArtistaForm(instance=artista)
                context = {'form': form, 'mensaje': mensaje}
                return render(request, 'productos/artistas_edit.html', context)
    except Artista.DoesNotExist:
        request.session['mensaje'] = "Error. Artista con ID " + \
            pk + " no existe en la base de datos"
        return redirect(crudArtistas)
    except ValueError:
        request.session['mensaje'] = "Error. Se ingresaron datos inválidos para actualizar al Artista ID " + pk
        return redirect(crudArtistas)
    except Exception:
        request.session['mensaje'] = "Error. No se pudo actualizar el Artista en la base de datos."
        return redirect(crudArtistas)
