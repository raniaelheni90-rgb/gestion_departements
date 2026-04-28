#!/usr/bin/env python
"""
Script to populate the database with sample students
"""
import os
import django
from datetime import date

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from etudiants.models import Etudiant

def populate_etudiants():
    """Populate the database with sample students"""

    etudiants_data = [
        {
            "cin": "AB123456",
            "passport": None,
            "nationalite": "Marocaine",
            "nom": "Alaoui",
            "prenom": "Ahmed",
            "email": "ahmed.alaoui@univ.ma",
            "numTel": "0612345678",
            "dateNaissance": date(2000, 5, 15),
            "adresse": "123 Rue de la Kasbah, Casablanca"
        },
        {
            "cin": "CD234567",
            "passport": None,
            "nationalite": "Marocaine",
            "nom": "Bennani",
            "prenom": "Fatima",
            "email": "fatima.bennani@univ.ma",
            "numTel": "0623456789",
            "dateNaissance": date(1999, 8, 22),
            "adresse": "456 Boulevard Hassan II, Rabat"
        },
        {
            "cin": "EF345678",
            "passport": None,
            "nationalite": "Marocaine",
            "nom": "Tazi",
            "prenom": "Karim",
            "email": "karim.tazi@univ.ma",
            "numTel": "0634567890",
            "dateNaissance": date(2001, 3, 10),
            "adresse": "789 Avenue Mohammed V, Marrakech"
        },
        {
            "cin": "GH456789",
            "passport": None,
            "nationalite": "Marocaine",
            "nom": "El Khattabi",
            "prenom": "Nadia",
            "email": "nadia.elkhattabi@univ.ma",
            "numTel": "0645678901",
            "dateNaissance": date(2000, 12, 5),
            "adresse": "321 Rue des Jardins, Fès"
        },
        {
            "cin": "IJ567890",
            "passport": None,
            "nationalite": "Marocaine",
            "nom": "Bouazza",
            "prenom": "Youssef",
            "email": "youssef.bouazza@univ.ma",
            "numTel": "0656789012",
            "dateNaissance": date(1998, 7, 30),
            "adresse": "654 Place de la Victoire, Tanger"
        },
        {
            "cin": "KL678901",
            "passport": None,
            "nationalite": "Marocaine",
            "nom": "Rachidi",
            "prenom": "Samira",
            "email": "samira.rachidi@univ.ma",
            "numTel": "0667890123",
            "dateNaissance": date(2001, 1, 18),
            "adresse": "987 Rue de l'Océan, Agadir"
        },
        {
            "cin": "MN789012",
            "passport": None,
            "nationalite": "Marocaine",
            "nom": "Zouhair",
            "prenom": "Omar",
            "email": "omar.zouhair@univ.ma",
            "numTel": "0678901234",
            "dateNaissance": date(1999, 11, 25),
            "adresse": "147 Avenue de la Paix, Meknès"
        },
        {
            "cin": "OP890123",
            "passport": None,
            "nationalite": "Marocaine",
            "nom": "Lahlou",
            "prenom": "Sara",
            "email": "sara.lahlou@univ.ma",
            "numTel": "0689012345",
            "dateNaissance": date(2000, 9, 8),
            "adresse": "258 Boulevard de l'Indépendance, Oujda"
        },
        {
            "cin": "QR901234",
            "passport": None,
            "nationalite": "Marocaine",
            "nom": "Mouline",
            "prenom": "Hassan",
            "email": "hassan.mouline@univ.ma",
            "numTel": "0690123456",
            "dateNaissance": date(1998, 4, 12),
            "adresse": "369 Rue des Roses, Tetouan"
        },
        {
            "cin": "ST012345",
            "passport": None,
            "nationalite": "Marocaine",
            "nom": "Kabbaj",
            "prenom": "Leila",
            "email": "leila.kabbaj@univ.ma",
            "numTel": "0601234567",
            "dateNaissance": date(2001, 6, 20),
            "adresse": "741 Avenue des Palmiers, El Jadida"
        }
    ]

    print("=== POPULATING ETUDIANTS ===")

    for etudiant_data in etudiants_data:
        etudiant, created = Etudiant.objects.get_or_create(
            cin=etudiant_data["cin"],
            defaults=etudiant_data
        )

        if created:
            print(f"✓ Created student: {etudiant.nom} {etudiant.prenom} ({etudiant.cin})")
        else:
            print(f"⚠ Student already exists: {etudiant.nom} {etudiant.prenom} ({etudiant.cin})")

    print(f"\nTotal students in database: {Etudiant.objects.count()}")

if __name__ == "__main__":
    populate_etudiants()