import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from academique.models import Licence, Module
from django.db.models import Count

licence = Licence.objects.get(nom='Licence en Informatique de Gestion')
duplicates = Module.objects.filter(licence=licence).values('nom').annotate(count=Count('nom')).filter(count__gt=1)

print('Duplicates by name:')
for d in duplicates:
    print(f'{d["nom"]}: {d["count"]}')

if not duplicates:
    print('No duplicates found.')

print(f'Total modules: {Module.objects.filter(licence=licence).count()}')