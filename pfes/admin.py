from django.contrib import admin
from .models import Jury, PFE, PFEStudent


@admin.register(Jury)
class JuryAdmin(admin.ModelAdmin):
    list_display = ('idJury', 'titre')
    filter_horizontal = ('enseignants',)


@admin.register(PFE)
class PFEAdmin(admin.ModelAdmin):
    list_display = ('idPfe', 'sujet', 'specialite', 'duree', 'encadrant', 'jury')
    raw_id_fields = ('encadrant', 'jury')


@admin.register(PFEStudent)
class PFEStudentAdmin(admin.ModelAdmin):
    list_display = ('pfe', 'etudiant')
