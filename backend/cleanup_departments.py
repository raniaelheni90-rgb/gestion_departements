#!/usr/bin/env python
"""
Script to clean up departments based on the official list provided by the user
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from academique.models import Departement, Licence, Specialite, Module

def cleanup_departments():
    """Clean up departments to match the official list"""

    # Official list from user
    official_departments = [
        'Sciences de gestion',
        'Méthodes quantitatives',
        'Informatique de gestion',
        'Sciences économiques et commerce international',
        'Fiscalité et droit des affaires',
        'Cellule langue et informatique'
    ]

    print("=== NETTOYAGE DES DEPARTEMENTS ===")
    print(f"Départements officiels à conserver: {len(official_departments)}")

    # Get all existing departments
    all_departments = Departement.objects.all()
    print(f"Départements existants: {all_departments.count()}")

    # Find departments to delete
    departments_to_delete = []
    for dept in all_departments:
        if dept.nom not in official_departments:
            departments_to_delete.append(dept)

    print(f"Départements à supprimer: {len(departments_to_delete)}")

    # Show what will be deleted
    total_modules_deleted = 0
    total_specialites_deleted = 0
    total_licences_deleted = 0

    for dept in departments_to_delete:
        print(f"\nSuppression de: {dept.nom} ({dept.code})")

        # Get associated licences
        licences = Licence.objects.filter(departement=dept)
        print(f"  Licences associées: {licences.count()}")

        for licence in licences:
            specialites = Specialite.objects.filter(licence=licence)
            modules = Module.objects.filter(licence=licence)

            print(f"    - {licence.nom}: {specialites.count()} spécialités, {modules.count()} modules")

            total_licences_deleted += 1
            total_specialites_deleted += specialites.count()
            total_modules_deleted += modules.count()

    print("
=== RESUME DE LA SUPPRESSION ==="    print(f"Départements: {len(departments_to_delete)}")
    print(f"Licences: {total_licences_deleted}")
    print(f"Spécialités: {total_specialites_deleted}")
    print(f"Modules: {total_modules_deleted}")

    # Ask for confirmation (in real script, this would be interactive)
    confirm = input("\nConfirmer la suppression (y/N)? ").lower().strip()
    if confirm == 'y':
        # Delete in correct order (modules -> specialites -> licences -> departments)
        for dept in departments_to_delete:
            licences = Licence.objects.filter(departement=dept)
            for licence in licences:
                # Delete modules
                modules = Module.objects.filter(licence=licence)
                modules_count = modules.count()
                modules.delete()
                print(f"Supprimé {modules_count} modules de {licence.nom}")

                # Delete specialites
                specialites = Specialite.objects.filter(licence=licence)
                specialites_count = specialites.count()
                specialites.delete()
                print(f"Supprimé {specialites_count} spécialités de {licence.nom}")

                # Delete licence
                licence.delete()
                print(f"Supprimé licence: {licence.nom}")

            # Delete department
            dept.delete()
            print(f"Supprimé département: {dept.nom}")

        print("\n=== NETTOYAGE TERMINE ===")
        print("Base de données nettoyée selon la liste officielle des départements.")

    else:
        print("Suppression annulée.")

def show_final_state():
    """Show the final state after cleanup"""
    print("\n=== ETAT FINAL ===")
    departments = Departement.objects.all().order_by('nom')
    print(f"Départements restants: {departments.count()}")

    for dept in departments:
        licences = Licence.objects.filter(departement=dept)
        total_modules = sum(Module.objects.filter(licence=licence).count() for licence in licences)
        total_specialites = sum(Specialite.objects.filter(licence=licence).count() for licence in licences)

        print(f"  - {dept.nom} ({dept.code}): {licences.count()} licences, {total_specialites} spécialités, {total_modules} modules")

if __name__ == "__main__":
    cleanup_departments()
    show_final_state()