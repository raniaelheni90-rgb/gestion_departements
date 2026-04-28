#!/usr/bin/env python
"""
Script to populate the database with the departments list
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from academique.models import Departement

def populate_departements():
    """Populate the database with the provided departments"""

    departments_data = [
        {"nom": "Sciences de gestion", "code": "SG", "responsable": "Dr. Ahmed Bennani", "email": "ahmed.bennani@univ.ma", "telephone": "+212 6 12 34 56 78"},
        {"nom": "Méthodes quantitatives", "code": "MQ", "responsable": "Pr. Fatima Alaoui", "email": "fatima.alaoui@univ.ma", "telephone": "+212 6 23 45 67 89"},
        {"nom": "Informatique de gestion", "code": "IG", "responsable": "Dr. Karim Tazi", "email": "karim.tazi@univ.ma", "telephone": "+212 6 34 56 78 90"},
        {"nom": "Sciences économiques et commerce international", "code": "SECI", "responsable": "Pr. Nadia El Khattabi", "email": "nadia.elkhattabi@univ.ma", "telephone": "+212 6 45 67 89 01"},
        {"nom": "Fiscalité et droit des affaires", "code": "FDA", "responsable": "Dr. Youssef Bouazza", "email": "youssef.bouazza@univ.ma", "telephone": "+212 6 56 78 90 12"},
        {"nom": "Cellule langue et informatique", "code": "CLI", "responsable": "Mme. Samira Rachidi", "email": "samira.rachidi@univ.ma", "telephone": "+212 6 67 89 01 23"}
    ]

    print("=== POPULATING DEPARTMENTS ===")

    for dept_data in departments_data:
        dept, created = Departement.objects.get_or_create(
            nom=dept_data["nom"],
            defaults={
                "code": dept_data["code"],
                "responsable": dept_data.get("responsable"),
                "email": dept_data.get("email"),
                "telephone": dept_data.get("telephone")
            }
        )

        if created:
            print(f"✓ Created department: {dept.nom} ({dept.code})")
        else:
            # Update existing if fields are missing
            updated = False
            if not dept.responsable and dept_data.get("responsable"):
                dept.responsable = dept_data["responsable"]
                updated = True
            if not dept.email and dept_data.get("email"):
                dept.email = dept_data["email"]
                updated = True
            if not dept.telephone and dept_data.get("telephone"):
                dept.telephone = dept_data["telephone"]
                updated = True
            if updated:
                dept.save()
                print(f"✓ Updated department: {dept.nom} ({dept.code})")
            else:
                print(f"⚠ Department already exists: {dept.nom} ({dept.code})")

    print(f"\nTotal departments in database: {Departement.objects.count()}")

if __name__ == "__main__":
    populate_departements()