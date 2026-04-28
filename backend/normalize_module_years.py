import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
import django
django.setup()
from academique.models import Module

mapping = {'1': 'L1', '2': 'L2', '3': 'L3'}
updated = 0
for m in Module.objects.filter(annee__in=mapping.keys()):
    old = m.annee
    m.annee = mapping[old]
    m.save()
    print(f'Updated module {m.id}: {old} -> {m.annee} ({m.nom})')
    updated += 1
print(f'Updated {updated} module(s)')
