from django.contrib import admin
from .models import Etudiant

@admin.register(Etudiant)
class EtudiantAdmin(admin.ModelAdmin):
    list_display = ('cin', 'nom', 'prenom', 'email', 'passport', 'nationalite')