import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
import django
django.setup()
from academique.models import Module

print('First 120 modules sorted by year/semester/code:')
for m in Module.objects.all().order_by('annee','semestre','code')[:120]:
    print(repr(m.nom), repr(m.code), repr(m.annee), repr(m.semestre))
print('----- NULL année')
for m in Module.objects.filter(annee__isnull=True):
    print(m.id, m.nom, m.code, m.semestre)
print('----- NULL semestre')
for m in Module.objects.filter(semestre__isnull=True):
    print(m.id, m.nom, m.code, m.annee)
