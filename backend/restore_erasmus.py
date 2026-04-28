import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from academique.models import Licence, Module

licence = Licence.objects.get(nom='Licence en Informatique de Gestion')

erasmus_data = [
    {'nom': 'Erasmus modules', 'code': 'L1IG-S2-10', 'semestre': 'S2', 'annee': '1'},
    {'nom': 'Erasmus modules', 'code': 'L2IG-S3-11', 'semestre': 'S3', 'annee': '2'},
    {'nom': 'Erasmus modules', 'code': 'L2IG-S4-12', 'semestre': 'S4', 'annee': '2'},
    {'nom': 'Erasmus modules', 'code': 'L3IG-S5-10', 'semestre': 'S5', 'annee': '3'}
]

for data in erasmus_data:
    module, created = Module.objects.get_or_create(
        licence=licence,
        code=data['code'],
        defaults={
            'nom': data['nom'],
            'semestre': data['semestre'],
            'annee': data['annee'],
            'coefficient': 1,
            'credit': 2,
            'volume_horaire': 20,
            'type': 'Optionnel'
        }
    )
    print(f'Added: {module.nom} ({module.code})' if created else f'Exists: {module.nom} ({module.code})')

print(f'Total modules: {Module.objects.filter(licence=licence).count()}')