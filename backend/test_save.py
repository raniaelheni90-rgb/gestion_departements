import os
import django
from django.db import connection

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from enseignants.serializers import EnseignantSerializer
from etudiants.serializers import EtudiantSerializer

print("Testing EnseignantSerializer...")
enseignant_data = {
    'matricule': 'TEST999',
    'cin': '99999999',
    'nom': 'Test',
    'prenom': 'Test',
    'email': 'test999@gmail.com',
    'numTel': '12345678',
    'grade': 'Maitre',
    'dateRecrutement': '2020-01-01',
}
serializer = EnseignantSerializer(data=enseignant_data)
if not serializer.is_valid():
    print("Enseignant Validation Error:", serializer.errors)
else:
    try:
        instance = serializer.save()
        print("Enseignant created successfully:", instance.matricule)
        instance.delete()
    except Exception as e:
        import traceback
        print("Enseignant Save Error:")
        traceback.print_exc()

print("\nTesting EtudiantSerializer...")
etudiant_data = {
    'cin': '88888888',
    'nom': 'TestEtu',
    'prenom': 'TestEtu',
    'email': 'test888@gmail.com',
    'numTel': '87654321',
    'dateNaissance': '2000-01-01',
    'adresse': 'Tunis',
}
eserializer = EtudiantSerializer(data=etudiant_data)
if not eserializer.is_valid():
    print("Etudiant Validation Error:", eserializer.errors)
else:
    try:
        einstance = eserializer.save()
        print("Etudiant created successfully:", einstance.idEtudiant)
        einstance.delete()
    except Exception as e:
        import traceback
        print("Etudiant Save Error:")
        traceback.print_exc()
