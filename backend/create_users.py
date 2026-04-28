import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from django.contrib.auth.models import User
from enseignants.models import Enseignant
from academique.models import Departement

def create_users():
    # Create Admin
    admin_user, created = User.objects.get_or_create(username='admin', defaults={'email': 'admin@example.com'})
    admin_user.set_password('admin123')
    admin_user.is_superuser = True
    admin_user.is_staff = True
    admin_user.save()
    print("Admin user created/updated: admin / admin123")

    # Ensure admin Enseignant exists
    Enseignant.objects.update_or_create(
        matricule='ADMIN01',
        defaults={
            'user': admin_user,
            'cin': '00000000',
            'nom': 'Admin',
            'prenom': 'Super',
            'email': 'admin@example.com',
            'role': 'admin',
            'dateRecrutement': '2020-01-01'
        }
    )

    # Create Chef de Departement examples
    # Let's get a department
    dept = Departement.objects.first()
    if dept:
        chef_user, created = User.objects.get_or_create(username='chef1', defaults={'email': 'chef1@example.com'})
        chef_user.set_password('chef123')
        chef_user.save()

        Enseignant.objects.update_or_create(
            matricule='CHEF01',
            defaults={
                'user': chef_user,
                'cin': '11111111',
                'nom': 'Chef',
                'prenom': 'Departement',
                'email': 'chef1@example.com',
                'role': 'chef_departement',
                'departement': dept,
                'dateRecrutement': '2020-01-01'
            }
        )
        print(f"Chef user created: chef1 / chef123 for department {dept.nom}")
    else:
        print("No departments exist yet to assign a chef!")

if __name__ == '__main__':
    create_users()
