import os
import django
import re
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from django.contrib.auth.models import User
from enseignants.models import Enseignant
from academique.models import Departement

def create_responsables():
    deps = Departement.objects.exclude(responsable__isnull=True).exclude(email__isnull=True)
    for dept in deps:
        email = dept.email
        password = dept.code
        
        # 1. Create or get User
        user, created = User.objects.get_or_create(username=email, defaults={'email': email})
        user.set_password(password)
        user.save()
        
        # 2. Extract Nom/Prenom from responsable text
        parts = dept.responsable.split()
        if len(parts) > 1 and parts[0] in ['Mme.', 'Mr.', 'Dr.', 'Pr.']:
            parts = parts[1:]
        
        prenom = parts[0] if len(parts) > 0 else 'Chef'
        nom = " ".join(parts[1:]) if len(parts) > 1 else 'Departement'
        
        matricule = f"RESP_{dept.code}"
        
        # Generate a pseudo-random unique CIN like '80000001'
        cin_base = str(dept.id).zfill(8)
        
        # Clean phone number for the Enseignant profile
        raw_phone = dept.telephone or ""
        digits = re.sub(r'[^\d]', '', raw_phone)
        numtel = digits[-8:] if len(digits) >= 8 else "00000000"
        
        # 3. Create or update Enseignant
        Enseignant.objects.update_or_create(
            matricule=matricule,
            defaults={
                'user': user,
                'cin': cin_base,
                'nom': nom,
                'prenom': prenom,
                'email': email,
                'numtel': numtel,
                'grade': 'Professeur',
                'dateRecrutement': '2020-01-01',
                'role': 'chef_departement',
                'departement': dept
            }
        )
        print(f"Compte cree pour {dept.nom} | Identifiant: {email} | Mot de passe: {password}")

if __name__ == '__main__':
    create_responsables()
