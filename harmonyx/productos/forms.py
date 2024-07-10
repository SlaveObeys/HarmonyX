from django import forms
from .models import Artista

from django.forms import ModelForm

def apply_custom_textInputs(widget): # Funcion para aplicar estos a los textInputs que usemos
    default_attrs = {
        'class': 'w-full text-center text-black font-medium bg-white rounded border focus:ring-1 focus:ring-white focus:border-white focus:bg-transparent focus:ring-text-white text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
        'required': 'required',
        'autocomplete': 'off',
    }
    widget.attrs.update(default_attrs)
    return widget

class ArtistaForm(ModelForm):
    class Meta:
        model = Artista
        fields = ["nombre_artista",]
        labels = {'nombre_artista': 'Nombre Artista', }
        widgets = {
            'nombre_artista': apply_custom_textInputs(forms.TextInput()),
        }