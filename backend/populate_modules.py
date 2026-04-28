#!/usr/bin/env python
"""
Script pour peupler la base de données avec des modules exemple
"""
import os
import sys
import django

# Configuration Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from academique.models import Licence, Specialite, Module

def populate_modules():
    print("=== POPULATING MODULES ===")

    # Récupérer les licences existantes
    licences = Licence.objects.all()
    if not licences:
        print("❌ Aucune licence trouvée. Veuillez d'abord peupler les licences.")
        return

    modules_data = [
        # Licence en Sciences de Gestion (LSG)
        {
            'licence_code': 'LSG',
            'modules': [
                # L1 - Semestre 1
                {'nom': 'Mathématiques 1', 'code': 'MATH101', 'semestre': 'S1', 'annee': 'L1', 'type': 'cours', 'credit': 6, 'volume_horaire': 60},
                {'nom': 'Économie générale', 'code': 'ECO101', 'semestre': 'S1', 'annee': 'L1', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Comptabilité générale', 'code': 'COMP101', 'semestre': 'S1', 'annee': 'L1', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Anglais 1', 'code': 'ANG101', 'semestre': 'S1', 'annee': 'L1', 'type': 'td', 'credit': 2, 'volume_horaire': 30},

                # L1 - Semestre 2
                {'nom': 'Mathématiques 2', 'code': 'MATH102', 'semestre': 'S2', 'annee': 'L1', 'type': 'cours', 'credit': 6, 'volume_horaire': 60},
                {'nom': 'Droit des affaires', 'code': 'DROIT101', 'semestre': 'S2', 'annee': 'L1', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Statistiques 1', 'code': 'STAT101', 'semestre': 'S2', 'annee': 'L1', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Informatique 1', 'code': 'INFO101', 'semestre': 'S2', 'annee': 'L1', 'type': 'tp', 'credit': 3, 'volume_horaire': 40},

                # L2 - Semestre 3 (spécialisés par spécialité)
                {'nom': 'Gestion financière', 'code': 'GF201', 'semestre': 'S3', 'annee': 'L2', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite_code': 'FIN'},
                {'nom': 'Analyse financière', 'code': 'AF201', 'semestre': 'S3', 'annee': 'L2', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite_code': 'FIN'},
                {'nom': 'Marketing stratégique', 'code': 'MS201', 'semestre': 'S3', 'annee': 'L2', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite_code': 'MKT'},
                {'nom': 'Comptabilité analytique', 'code': 'CA201', 'semestre': 'S3', 'annee': 'L2', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite_code': 'COMP'},

                # L3 - Semestre 5 (spécialisés)
                {'nom': 'Contrôle de gestion', 'code': 'CG301', 'semestre': 'S5', 'annee': 'L3', 'type': 'cours', 'credit': 6, 'volume_horaire': 60, 'specialite_code': 'MGMT'},
                {'nom': 'Audit et contrôle', 'code': 'AC301', 'semestre': 'S5', 'annee': 'L3', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite_code': 'COMP'},
                {'nom': 'Finance internationale', 'code': 'FI301', 'semestre': 'S5', 'annee': 'L3', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite_code': 'FIN'},
                {'nom': 'Marketing digital', 'code': 'MD301', 'semestre': 'S5', 'annee': 'L3', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite_code': 'MKT'},
            ]
        },

        # Licence en Économie (LECO)
        {
            'licence_code': 'LECO',
            'modules': [
                # L1 - Semestre 1
                {'nom': 'Microéconomie', 'code': 'MICRO101', 'semestre': 'S1', 'annee': 'L1', 'type': 'cours', 'credit': 6, 'volume_horaire': 60},
                {'nom': 'Macroéconomie', 'code': 'MACRO101', 'semestre': 'S1', 'annee': 'L1', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Mathématiques économiques', 'code': 'MATHECO101', 'semestre': 'S1', 'annee': 'L1', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},

                # L2 - Semestre 3
                {'nom': 'Économie monétaire', 'code': 'EMON201', 'semestre': 'S3', 'annee': 'L2', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite_code': 'MFBA'},
                {'nom': 'Banques et institutions financières', 'code': 'BIF201', 'semestre': 'S3', 'annee': 'L2', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite_code': 'MFBA'},

                # L3 - Semestre 5
                {'nom': 'Politique monétaire', 'code': 'PMON301', 'semestre': 'S5', 'annee': 'L3', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite_code': 'MFBA'},
                {'nom': 'Régulation bancaire', 'code': 'RB301', 'semestre': 'S5', 'annee': 'L3', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite_code': 'MFBA'},
            ]
        },

        # Licence en Informatique de Gestion (LIG)
        {
            'licence_code': 'LIG',
            'modules': [
                # L1 - Semestre 1
                {'nom': 'Algorithmique', 'code': 'ALGO101', 'semestre': 'S1', 'annee': 'L1', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Bases de données', 'code': 'BDD101', 'semestre': 'S1', 'annee': 'L1', 'type': 'cours', 'credit': 6, 'volume_horaire': 60},
                {'nom': 'Programmation 1', 'code': 'PROG101', 'semestre': 'S1', 'annee': 'L1', 'type': 'tp', 'credit': 4, 'volume_horaire': 60},

                # L2 - Semestre 3
                {'nom': 'Systèmes d\'information', 'code': 'SI201', 'semestre': 'S3', 'annee': 'L2', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Développement web', 'code': 'WEB201', 'semestre': 'S3', 'annee': 'L2', 'type': 'tp', 'credit': 4, 'volume_horaire': 60},

                # L3 - Semestre 5
                {'nom': 'Business Intelligence', 'code': 'BI301', 'semestre': 'S5', 'annee': 'L3', 'type': 'cours', 'credit': 6, 'volume_horaire': 60, 'specialite_code': 'BI'},
                {'nom': 'Data Mining', 'code': 'DM301', 'semestre': 'S5', 'annee': 'L3', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite_code': 'BI'},
                {'nom': 'Entrepôts de données', 'code': 'ED301', 'semestre': 'S5', 'annee': 'L3', 'type': 'tp', 'credit': 4, 'volume_horaire': 45, 'specialite_code': 'BI'},
            ]
        }
    ]

    total_modules = 0

    for licence_data in modules_data:
        try:
            licence = Licence.objects.get(code=licence_data['licence_code'])
            print(f"\n📚 Processing licence: {licence.nom} ({licence.code})")

            for module_data in licence_data['modules']:
                # Déterminer la spécialité si spécifiée
                specialite = None
                if 'specialite_code' in module_data:
                    try:
                        specialite = Specialite.objects.get(code=module_data['specialite_code'], licence=licence)
                    except Specialite.DoesNotExist:
                        print(f"  ⚠️  Specialite {module_data['specialite_code']} not found for licence {licence.code}, creating module without specialite")
                        specialite = None

                # Créer le module
                module, created = Module.objects.get_or_create(
                    code=module_data['code'],
                    defaults={
                        'nom': module_data['nom'],
                        'coefficient': 1.0,
                        'credit': module_data['credit'],
                        'volume_horaire': module_data['volume_horaire'],
                        'type': module_data['type'],
                        'semestre': module_data['semestre'],
                        'annee': module_data['annee'],
                        'licence': licence,
                        'specialite': specialite,
                    }
                )

                if created:
                    status = "✓ Created"
                    total_modules += 1
                else:
                    status = "⏭️  Skipped (exists)"

                specialite_info = f" - {specialite.nom}" if specialite else ""
                print(f"  {status} module: {module.nom} ({module.code}) - {module.annee} {module.semestre}{specialite_info}")

        except Licence.DoesNotExist:
            print(f"❌ Licence {licence_data['licence_code']} not found, skipping...")

    print("\n=== SUMMARY ===")
    print(f"Total modules: {Module.objects.count()}")

    # Afficher la structure
    print("\n=== STRUCTURE ===")
    for licence in Licence.objects.all():
        print(f"📚 {licence.nom} ({licence.code})")
        for annee in ['L1', 'L2', 'L3']:
            modules_annee = Module.objects.filter(licence=licence, annee=annee)
            if modules_annee:
                print(f"  {annee}:")
                for semestre in ['S1', 'S2', 'S3', 'S4', 'S5', 'S6']:
                    modules_semestre = modules_annee.filter(semestre=semestre)
                    if modules_semestre:
                        print(f"    {semestre}: {modules_semestre.count()} modules")
                        for module in modules_semestre:
                            specialite_info = f" ({module.specialite.nom})" if module.specialite else ""
                            print(f"      └─ {module.nom} ({module.code}){specialite_info}")

if __name__ == '__main__':
    populate_modules()