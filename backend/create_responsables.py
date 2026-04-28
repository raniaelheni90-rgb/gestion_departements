import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from django.contrib.auth.models import User
from enseignants.models import Enseignant
from academique.models import Departement

def create_responsables():
    departements = Departement.objects.all()
    count = 0
    for dept in departements:
        if dept.email and dept.code:
            # Check if user already exists
            user, created = User.objects.get_or_create(
                username=dept.email, 
                defaults={'email': dept.email}
            )
            
            # Update password to the department code
            user.set_password(dept.code)
            user.save()
            
            # Ensure Enseignant exists and is linked
            matricule = f"RESP_{dept.code}"
            
            # Safely extract first/last name from responsable string
            nom = "Responsable"
            prenom = dept.code
            if dept.responsable:
                parts = dept.responsable.split()
                if len(parts) > 1:
                    # e.g., "Mme. Samira Rachidi"
                    nom = parts[-1]
                    prenom = " ".join(parts[:-1])
                else:
                    nom = dept.responsable
            
            Enseignant.objects.update_or_create(
                user=user,
                defaults={
                    'matricule': matricule,
                    'cin': f"0000{dept.id}",
                    'nom': nom,
                    'prenom': prenom,
                    'email': dept.email,
                    'role': 'chef_departement',
                    'departement': dept,
                    'dateRecrutement': '2023-01-01'
                }
            )
            
            print(f"[{dept.code}] Compte créé: {dept.email} / {dept.code}")
            count += 1
        else:
            print(f"Skipping {dept.nom} due to missing email or code.")
            
    print(f"\nCreated/Updated {count} responsables.")

if __name__ == '__main__':
    create_responsables()
