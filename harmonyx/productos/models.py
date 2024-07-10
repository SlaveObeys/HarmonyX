from django.db import models

# Create your models de base de datos here.


class Artista(models.Model):
    id_artista = models.AutoField(db_column='idArtista', primary_key=True)
    nombre_artista = models.CharField(max_length=50, blank=False, null=False)

    def __str__(self):
        return str(self.nombre_artista)


class Producto(models.Model):
    sku = models.CharField(primary_key=True, max_length=20)
    nombre_album = models.CharField(max_length=50, null=False)
    precio = models.CharField(max_length=10, null=False)
    fecha_lanzamiento = models.DateField(blank=False, null=False)
    nombre_img = models.CharField(max_length=50, default="testimg", null=False)
    tendencia = models.BooleanField(default=False)
    id_artista = models.ForeignKey(
        'Artista', on_delete=models.CASCADE, db_column='idArtista')

    def __str__(self):
        return str(self.nombre_album) + " | " + str(self.precio) + " | " + str(self.id_artista)
