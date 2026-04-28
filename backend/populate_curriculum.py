#!/usr/bin/env python
"""
Script to populate the academic database with detailed curriculum data
Based on the provided academic structure for three licences
"""
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from academique.models import Departement, Licence, Specialite, Module

def create_or_get_departement(nom, code):
    """Create or get departement"""
    dept, created = Departement.objects.get_or_create(
        nom=nom,
        defaults={'code': code}
    )
    return dept

def create_or_get_licence(nom, code, departement):
    """Create or get licence"""
    licence, created = Licence.objects.get_or_create(
        nom=nom,
        defaults={
            'code': code,
            'departement': departement,
            'duree': '3 ans'
        }
    )
    return licence

def create_or_get_specialite(nom, code, licence):
    """Create or get specialite"""
    specialite, created = Specialite.objects.get_or_create(
        nom=nom,
        licence=licence,
        defaults={'code': code}
    )
    return specialite

def create_module(nom, code, semestre, annee, licence, specialite, coefficient=1, credit=0, volume_horaire=0, type_module='cours'):
    """Create module if it doesn't exist"""
    module, created = Module.objects.get_or_create(
        code=code,
        defaults={
            'nom': nom,
            'semestre': semestre,
            'annee': annee,
            'licence': licence,
            'specialite': specialite,
            'coefficient': coefficient,
            'credit': credit,
            'volume_horaire': volume_horaire,
            'type': type_module
        }
    )
    return module, created

def populate_sciences_gestion():
    """Populate Licence Sciences de Gestion curriculum"""
    print("=== POPULATING LICENCE SCIENCES DE GESTION ===")

    # Get existing licence
    licence = Licence.objects.get(nom="Licence en Sciences de Gestion")
    print(f"Using licence: {licence.nom}")

    # Get existing specialities
    compta = Specialite.objects.get(nom="Comptabilité", licence=licence)
    finance = Specialite.objects.get(nom="Finance", licence=licence)
    marketing = Specialite.objects.get(nom="Marketing", licence=licence)
    management = Specialite.objects.get(nom="Management", licence=licence)

    # Create a "Tronc Commun" specialite for common modules
    tronc_commun, _ = Specialite.objects.get_or_create(
        nom="Tronc Commun",
        licence=licence,
        defaults={'code': 'TC-SG'}
    )

    # L1 Semestre 1 - Tronc Commun
    l1_s1_modules = [
        "Principes de Gestion 1",
        "Comptabilité Financière 1",
        "Microéconomie",
        "Mathématiques 1",
        "Introduction au Droit",
        "Mathématiques Financières",
        "Anglais 1",
        "C2i1"
    ]
    for i, module_name in enumerate(l1_s1_modules, 1):
        create_module(
            nom=module_name,
            code=f"L1SG-S1-{i:02d}",
            semestre="S1",
            annee="L1",
            licence=licence,
            specialite=tronc_commun
        )

    # L1 Semestre 2 - Tronc Commun
    l1_s2_modules = [
        "Principes de Gestion 1",  # Note: repeated from S1
        "Comptabilité Financière 2",
        "Mathématiques 2",
        "Statistique descriptive et calculs de probabilité",
        "Macroéconomie",
        "Droit des sociétés commerciales",
        "Anglais 2",
        "C2i1"
    ]
    for i, module_name in enumerate(l1_s2_modules, 1):
        create_module(
            nom=module_name,
            code=f"L1SG-S2-{i:02d}",
            semestre="S2",
            annee="L1",
            licence=licence,
            specialite=tronc_commun
        )

    # L2 Semestre 3 - Tronc Commun (sauf Comptabilité)
    l2_s3_tronc_modules = [
        "Fondamentaux du Management",
        "Comptabilité de gestion",
        "Fondamentaux du Marketing",
        "Cycle de conférences",
        "Anglais III",
        "Techniques de communication interpersonnelle",
        "Fiscalité",
        "Statistique inférentielle"
    ]
    for i, module_name in enumerate(l2_s3_tronc_modules, 1):
        create_module(
            nom=module_name,
            code=f"L2SG-TC-S3-{i:02d}",
            semestre="S3",
            annee="L2",
            licence=licence,
            specialite=tronc_commun
        )

    # L2 Semestre 4 - Tronc Commun
    l2_s4_tronc_modules = [
        "Fondamentaux de la GRH",
        "Diagnostic financier",
        "Gestion de la production",
        "Méthodologie d'élaboration d'un rapport de stage",
        "Anglais IV",
        "Coaching d'équipe et leadership",
        "Transformation digitale de l'entreprise",
        "Économie d'affaire"
    ]
    for i, module_name in enumerate(l2_s4_tronc_modules, 1):
        create_module(
            nom=module_name,
            code=f"L2SG-TC-S4-{i:02d}",
            semestre="S4",
            annee="L2",
            licence=licence,
            specialite=tronc_commun
        )

    # L2 Comptabilité Semestre 3
    l2_compta_s3_modules = [
        "Comptabilité intermédiaire 1",
        "Comptabilité de gestion",
        "IRPP / IS",
        "Journées thématiques",
        "Anglais III",
        "Techniques de communication personnelle",
        "Droit des obligations et des contrats",
        "Diagnostic financier"
    ]
    for i, module_name in enumerate(l2_compta_s3_modules, 1):
        create_module(
            nom=module_name,
            code=f"L2SG-COMP-S3-{i:02d}",
            semestre="S3",
            annee="L2",
            licence=licence,
            specialite=compta
        )

    # L2 Comptabilité Semestre 4
    l2_compta_s4_modules = [
        "Comptabilité intermédiaire 2",
        "TVA et droit de consommation",
        "Méthodologie d'élaboration d'un rapport de stage",
        "Anglais IV",
        "Coaching d'équipe et leadership",
        "Droit commercial",
        "Techniques de sondage et échantillonnage"
    ]
    for i, module_name in enumerate(l2_compta_s4_modules, 1):
        create_module(
            nom=module_name,
            code=f"L2SG-COMP-S4-{i:02d}",
            semestre="S4",
            annee="L2",
            licence=licence,
            specialite=compta
        )

    # L3 Comptabilité Semestre 5
    l3_compta_s5_modules = [
        "Comptabilité avancée",
        "Cadre conceptuel et présentation des états financiers",
        "Contrôle de gestion",
        "Étude de cas en comptabilité",
        "Anglais 5",
        "Culture entrepreneuriale",
        "Avantages fiscaux",
        "Finance internationale"
    ]
    for i, module_name in enumerate(l3_compta_s5_modules, 1):
        create_module(
            nom=module_name,
            code=f"L3SG-COMP-S5-{i:02d}",
            semestre="S5",
            annee="L3",
            licence=licence,
            specialite=compta
        )

    # L3 Comptabilité Semestre 6
    l3_compta_s6_modules = [
        "Comptabilité internationale (IFRS)",
        "Audit",
        "Décisions financières",
        "Projet de fin d'études (PFE)",
        "Français : rédaction professionnelle",
        "Progiciels comptables et ERP",
        "Procédures collectives",
        "Comptabilité sectorielle"
    ]
    for i, module_name in enumerate(l3_compta_s6_modules, 1):
        create_module(
            nom=module_name,
            code=f"L3SG-COMP-S6-{i:02d}",
            semestre="S6",
            annee="L3",
            licence=licence,
            specialite=compta
        )

    # L3 Finance Semestre 5
    l3_finance_s5_modules = [
        "Gestion financière internationale",
        "Gestion des institutions financières",
        "Économétrie appliquée à la finance",
        "Gestion de portefeuille",
        "Études de cas en finance",
        "Compétences linguistiques",
        "Compétences entrepreneuriales",
        "Gestion du fonds de roulement",
        "Gestion de projet"
    ]
    for i, module_name in enumerate(l3_finance_s5_modules, 1):
        create_module(
            nom=module_name,
            code=f"L3SG-FIN-S5-{i:02d}",
            semestre="S5",
            annee="L3",
            licence=licence,
            specialite=finance
        )

    # L3 Finance Semestre 6
    l3_finance_s6_modules = [
        "Ingénierie financière et montages financiers",
        "Politiques financières de l'entreprise",
        "Contrôle de gestion",
        "Projet de fin d'études (PFE)",
        "Français : rédaction professionnelle",
        "Gestion du risque de crédit",
        "Banques islamiques"
    ]
    for i, module_name in enumerate(l3_finance_s6_modules, 1):
        create_module(
            nom=module_name,
            code=f"L3SG-FIN-S6-{i:02d}",
            semestre="S6",
            annee="L3",
            licence=licence,
            specialite=finance
        )

    # L3 Marketing Semestre 5
    l3_marketing_s5_modules = [
        "Stratégie marketing",
        "Gestion des prix et des produits",
        "Recherche marketing",
        "Analyse du comportement du consommateur",
        "Études de cas en marketing",
        "Anglais V",
        "Négociation et gestion des conflits",
        "Marketing digital",
        "Éthique du marketing et RSE"
    ]
    for i, module_name in enumerate(l3_marketing_s5_modules, 1):
        create_module(
            nom=module_name,
            code=f"L3SG-MKT-S5-{i:02d}",
            semestre="S5",
            annee="L3",
            licence=licence,
            specialite=marketing
        )

    # L3 Marketing Semestre 6
    l3_marketing_s6_modules = [
        "Stratégies de distribution",
        "Communication marketing",
        "Analyse des données marketing",
        "Projet de fin d'études (PFE)",
        "Techniques d'expression française",
        "Développement des sites web",
        "Marketing de la relation client",
        "Web analytics et performance"
    ]
    for i, module_name in enumerate(l3_marketing_s6_modules, 1):
        create_module(
            nom=module_name,
            code=f"L3SG-MKT-S6-{i:02d}",
            semestre="S6",
            annee="L3",
            licence=licence,
            specialite=marketing
        )

    # L3 Management Semestre 5
    l3_management_s5_modules = [
        "Théorie des organisations",
        "Analyses quantitatives et qualitatives",
        "Management de projet",
        "Management de la qualité et certification",
        "Étude de cas en management",
        "Anglais V",
        "Négociation et gestion des conflits",
        "Management du risque et intelligence économique",
        "Responsabilité sociale et développement durable"
    ]
    for i, module_name in enumerate(l3_management_s5_modules, 1):
        create_module(
            nom=module_name,
            code=f"L3SG-MGMT-S5-{i:02d}",
            semestre="S5",
            annee="L3",
            licence=licence,
            specialite=management
        )

    # L3 Management Semestre 6
    l3_management_s6_modules = [
        "Management de l'innovation et entrepreneuriat",
        "Management de la transformation digitale et SI",
        "Management stratégique",
        "Contrôle de gestion",
        "Projet de fin d'études (PFE)",
        "Anglais VI",
        "Développement des sites web",
        "Gouvernance d'entreprise",
        "Création et pilotage d'une start-up"
    ]
    for i, module_name in enumerate(l3_management_s6_modules, 1):
        create_module(
            nom=module_name,
            code=f"L3SG-MGMT-S6-{i:02d}",
            semestre="S6",
            annee="L3",
            licence=licence,
            specialite=management
        )

    print(f"Created modules for Licence Sciences de Gestion")

def populate_sciences_economiques():
    """Populate Licence Sciences Économiques curriculum"""
    print("\n=== POPULATING LICENCE SCIENCES ÉCONOMIQUES ===")

    # Get existing licence
    licence = Licence.objects.get(nom="Licence en Économie")
    print(f"Using licence: {licence.nom}")

    # For Sciences Économiques, all modules are common (no specialities)
    # We'll use the existing MFBA speciality or create a "Tronc Commun" one
    tronc_commun, _ = Specialite.objects.get_or_create(
        nom="Tronc Commun",
        licence=licence,
        defaults={'code': 'TC-ECO'}
    )

    # L1 Semestre 1
    l1_s1_modules = [
        "Principes d'économie",
        "Comptabilité financière 1",
        "Analyse",
        "Statistiques descriptives et probabilités",
        "Anglais des affaires",
        "Français des affaires",
        "C2i1"
    ]
    for i, module_name in enumerate(l1_s1_modules, 1):
        create_module(
            nom=module_name,
            code=f"L1ECO-S1-{i:02d}",
            semestre="S1",
            annee="L1",
            licence=licence,
            specialite=tronc_commun
        )

    # L1 Semestre 2
    l1_s2_modules = [
        "Microéconomie",
        "Macroéconomie",
        "Comptabilité financière 2",
        "Algèbre",
        "Principes de droit",
        "Anglais des affaires",
        "Français des affaires",
        "C2i1"
    ]
    for i, module_name in enumerate(l1_s2_modules, 1):
        create_module(
            nom=module_name,
            code=f"L1ECO-S2-{i:02d}",
            semestre="S2",
            annee="L1",
            licence=licence,
            specialite=tronc_commun
        )

    # L2 Semestre 3
    l2_s3_modules = [
        "Microéconomie 2",
        "Macroéconomie 2",
        "Histoire des faits et de la pensée économique",
        "Conférences carrières",
        "Les métiers de l'économiste",
        "Anglais des affaires",
        "Français des affaires",
        "Culture entrepreneuriale",
        "Recherche opérationnelle",
        "Comptabilité nationale"
    ]
    for i, module_name in enumerate(l2_s3_modules, 1):
        create_module(
            nom=module_name,
            code=f"L2ECO-S3-{i:02d}",
            semestre="S3",
            annee="L2",
            licence=licence,
            specialite=tronc_commun
        )

    # L2 Semestre 4
    l2_s4_modules = [
        "Économie internationale",
        "Économie industrielle",
        "Économie monétaire",
        "Statistique inférentielle",
        "Méthodologie d'élaboration d'un rapport de stage",
        "Anglais des affaires",
        "Business model",
        "Macroéconomie internationale",
        "Calcul économique"
    ]
    for i, module_name in enumerate(l2_s4_modules, 1):
        create_module(
            nom=module_name,
            code=f"L2ECO-S4-{i:02d}",
            semestre="S4",
            annee="L2",
            licence=licence,
            specialite=tronc_commun
        )

    # L3 Semestre 5
    l3_s5_modules = [
        "Initiation à l'économétrie",
        "Économie de la banque et assurance",
        "Droit des institutions financières",
        "Macroéconomie monétaire",
        "Étude de cas en économie",
        "Business English",
        "Développement personnel",
        "Gestion bancaire",
        "Analyse de la conjoncture nationale"
    ]
    for i, module_name in enumerate(l3_s5_modules, 1):
        create_module(
            nom=module_name,
            code=f"L3ECO-S5-{i:02d}",
            semestre="S5",
            annee="L3",
            licence=licence,
            specialite=tronc_commun
        )

    # L3 Semestre 6
    l3_s6_modules = [
        "Enquête et sondage",
        "Finance internationale",
        "Techniques financières actuarielles",
        "Élaboration et validation du PFE",
        "Business English",
        "Analyse et évaluation des projets",
        "Marchés financiers et gestion de portefeuille",
        "Logiciels pour l'économie et la finance"
    ]
    for i, module_name in enumerate(l3_s6_modules, 1):
        create_module(
            nom=module_name,
            code=f"L3ECO-S6-{i:02d}",
            semestre="S6",
            annee="L3",
            licence=licence,
            specialite=tronc_commun
        )

    print(f"Created modules for Licence Sciences Économiques")

def populate_informatique_gestion():
    """Populate Licence Informatique de Gestion curriculum"""
    print("\n=== POPULATING LICENCE INFORMATIQUE DE GESTION ===")

    # Get existing licence
    licence = Licence.objects.get(nom="Licence en Informatique de Gestion")
    print(f"Using licence: {licence.nom}")

    # Get existing Business Intelligence speciality
    bi = Specialite.objects.get(nom="Business Intelligence", licence=licence)

    # L1 Semestre 1
    l1_s1_modules = [
        "Algorithmique et structures de données 1",
        "Systèmes d'exploitation",
        "Architecture des ordinateurs",
        "Analyse",
        "Statistiques et probabilités",
        "Principes de gestion",
        "Comptabilité générale",
        "Compétences numériques",
        "Business communication",
        "Développement personnel",
        "Travail collaboratif",
        "Interface homme-machine"
    ]
    for i, module_name in enumerate(l1_s1_modules, 1):
        create_module(
            nom=module_name,
            code=f"L1IG-S1-{i:02d}",
            semestre="S1",
            annee="L1",
            licence=licence,
            specialite=bi
        )

    # L1 Semestre 2
    l1_s2_modules = [
        "Algorithmique et structures de données 2",
        "Réseaux",
        "Introduction aux systèmes d'information",
        "Logique mathématique",
        "Algèbre",
        "Système d'information comptable",
        "Gestion financière",
        "Business communication 2",
        "Droit de l'informatique",
        "Erasmus modules"
    ]
    for i, module_name in enumerate(l1_s2_modules, 1):
        create_module(
            nom=module_name,
            code=f"L1IG-S2-{i:02d}",
            semestre="S2",
            annee="L1",
            licence=licence,
            specialite=bi
        )

    # L2 Semestre 3
    l2_s3_modules = [
        "Programmation orientée objet",
        "Programmation web 1",
        "Conception OO des SI",
        "Bases de données",
        "Statistiques inférentielles",
        "Fondements de l'IA",
        "Marketing digital",
        "Économie numérique",
        "Éthique et lois IT",
        "Projet professionnel (PPP)",
        "Erasmus modules"
    ]
    for i, module_name in enumerate(l2_s3_modules, 1):
        create_module(
            nom=module_name,
            code=f"L2IG-S3-{i:02d}",
            semestre="S3",
            annee="L2",
            licence=licence,
            specialite=bi
        )

    # L2 Semestre 4
    l2_s4_modules = [
        "Analyse et fouille de données",
        "Programmation web 2",
        "Théorie des graphes",
        "Génie logiciel (AGL)",
        "Architecture logicielle",
        "SGBD",
        "Data warehouse",
        "Entreprenariat",
        "Gestion de projet",
        "Optimisation non linéaire",
        "Processus unifié",
        "Erasmus modules"
    ]
    for i, module_name in enumerate(l2_s4_modules, 1):
        create_module(
            nom=module_name,
            code=f"L2IG-S4-{i:02d}",
            semestre="S4",
            annee="L2",
            licence=licence,
            specialite=bi
        )

    # L3 Semestre 5
    l3_s5_modules = [
        "Techniques de prévision",
        "Théorie de décision",
        "Big Data & Cloud",
        "Développement mobile",
        "ERP / SCM",
        "Sécurité IT",
        "Programmation avancée BI",
        "Leadership",
        "Psychology & sociology (anglais)",
        "Erasmus modules"
    ]
    for i, module_name in enumerate(l3_s5_modules, 1):
        create_module(
            nom=module_name,
            code=f"L3IG-S5-{i:02d}",
            semestre="S5",
            annee="L3",
            licence=licence,
            specialite=bi
        )

    # L3 Semestre 6
    l3_s6_modules = [
        "Stage en entreprise"
    ]
    for i, module_name in enumerate(l3_s6_modules, 1):
        create_module(
            nom=module_name,
            code=f"L3IG-S6-{i:02d}",
            semestre="S6",
            annee="L3",
            licence=licence,
            specialite=bi
        )

    print(f"Created modules for Licence Informatique de Gestion")

def main():
    """Main function to populate all curricula"""
    print("Starting academic curriculum population...")

    try:
        populate_sciences_gestion()
        populate_sciences_economiques()
        populate_informatique_gestion()

        print("\n=== POPULATION SUMMARY ===")
        total_modules = Module.objects.count()
        print(f"Total modules in database: {total_modules}")

        # Count modules by licence
        licences = Licence.objects.all()
        for licence in licences:
            module_count = Module.objects.filter(licence=licence).count()
            print(f"- {licence.nom}: {module_count} modules")

        print("\nCurriculum population completed successfully!")

    except Exception as e:
        print(f"Error during population: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()