import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()
from academique.models import Licence, Module
licence = Licence.objects.get(nom='Licence en Informatique de Gestion')
for m in Module.objects.filter(licence=licence).order_by('semestre','code'):
    if 'Erasmus' in m.nom or m.code.startswith('L') and 'IG-S' in m.code:
        print(m.id, m.nom, m.code, m.semestre, m.annee)
