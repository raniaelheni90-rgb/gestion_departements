#!/usr/bin/env python
"""
Script to populate the database with licences and specialities
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from academique.models import Departement, Licence, Specialite

def populate_licences_and_specialites():
    """Populate the database with licences and their specialities"""

    # Mapping des départements
    departements = {
        "SG": "Sciences de gestion",
        "SECI": "Sciences économiques et commerce international",
        "IG": "Informatique de gestion"
    }

    # Structure des licences et spécialités
    licences_data = [
        {
            "nom": "Licence en Sciences de Gestion",
            "code": "LSG",
            "departement_code": "SG",
            "specialites": [
                {"nom": "Comptabilité", "code": "COMP"},
                {"nom": "Finance", "code": "FIN"},
                {"nom": "Marketing", "code": "MKT"},
                {"nom": "Management", "code": "MGMT"}
            ]
        },
        {
            "nom": "Licence en Économie",
            "code": "LECO",
            "departement_code": "SECI",
            "specialites": [
                {"nom": "Monnaie – Finance – Banque – Assurance", "code": "MFBA"}
            ]
        },
        {
            "nom": "Licence en Informatique de Gestion",
            "code": "LIG",
            "departement_code": "IG",
            "specialites": [
                {"nom": "Business Intelligence", "code": "BI"}
            ]
        }
    ]

    print("=== POPULATING LICENCES AND SPECIALITIES ===")

    for licence_data in licences_data:
        # Récupérer le département
        dept_nom = departements.get(licence_data["departement_code"])
        if not dept_nom:
            print(f"❌ Département {licence_data['departement_code']} non trouvé")
            continue

        try:
            departement = Departement.objects.get(nom=dept_nom)
        except Departement.DoesNotExist:
            print(f"❌ Département '{dept_nom}' n'existe pas")
            continue

        # Créer ou récupérer la licence
        licence, licence_created = Licence.objects.get_or_create(
            nom=licence_data["nom"],
            defaults={
                "code": licence_data["code"],
                "departement": departement,
                "duree": "3 ans"
            }
        )

        if licence_created:
            print(f"✓ Created licence: {licence.nom} ({licence.code}) - {departement.nom}")
        else:
            print(f"⚠ Licence already exists: {licence.nom} ({licence.code})")

        # Créer les spécialités
        for spec_data in licence_data["specialites"]:
            specialite, spec_created = Specialite.objects.get_or_create(
                nom=spec_data["nom"],
                licence=licence,
                defaults={"code": spec_data["code"]}
            )

            if spec_created:
                print(f"  ✓ Created specialite: {specialite.nom} ({specialite.code})")
            else:
                print(f"  ⚠ Specialite already exists: {specialite.nom} ({specialite.code})")

    print("\n=== SUMMARY ===")
    print(f"Total licences: {Licence.objects.count()}")
    print(f"Total specialites: {Specialite.objects.count()}")

    # Afficher la structure
    print("\n=== STRUCTURE ===")
    for licence in Licence.objects.all():
        print(f"📚 {licence.nom} ({licence.code}) - {licence.departement.nom}")
        for spec in licence.specialites.all():
            print(f"  └─ 🎯 {spec.nom} ({spec.code})")

if __name__ == "__main__":
    populate_licences_and_specialites()