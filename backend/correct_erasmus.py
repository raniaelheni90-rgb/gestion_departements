import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from academique.models import Licence, Module

licence = Licence.objects.get(nom='Licence en Informatique de Gestion')

updates = {
    'L1IG-S2-10': 'Erasmus : Digital Business Transformation',
    'L2IG-S3-11': 'ERASMUS - Systems and Data Integration',
    'L2IG-S4-12': 'ERASMUS - BI and Data Analytics',
    'L3IG-S5-10': 'ERASMUS - Systems Modeling and Simulation',
}

for code, new_name in updates.items():
    try:
        module = Module.objects.get(licence=licence, code=code)
        module.nom = new_name
        module.save()
        print(f'Updated {code} -> {new_name}')
    except Module.DoesNotExist:
        print(f'Module {code} not found')

new_modules = [
    {
        'nom': 'Erasmus : Entreprise Systems',
        'code': 'L1IG-S2-11',
        'semestre': 'S2',
        'annee': 'L1',
    },
    {
        'nom': 'ERASMUS - Engineering Business Process',
        'code': 'L2IG-S3-12',
        'semestre': 'S3',
        'annee': 'L2',
    },
    {
        'nom': 'ERASMUS - Systems Security and Availability',
        'code': 'L3IG-S5-11',
        'semestre': 'S5',
        'annee': 'L3',
    },
]

for data in new_modules:
    module, created = Module.objects.get_or_create(
        licence=licence,
        code=data['code'],
        defaults={
            'nom': data['nom'],
            'coefficient': 1.0,
            'credit': 2,
            'volume_horaire': 20,
            'type': 'cours',
            'semestre': data['semestre'],
            'annee': data['annee'],
            'description': '',
        }
    )
    if created:
        print(f'Created {data["code"]} -> {data["nom"]}')
    else:
        print(f'Already exists {data["code"]} -> {data["nom"]}')

print('Finished. Total modules:', Module.objects.filter(licence=licence).count())
