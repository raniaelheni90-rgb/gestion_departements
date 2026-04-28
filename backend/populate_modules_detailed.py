#!/usr/bin/env python
"""
Script pour peupler la base de données avec les modules détaillés pour chaque licence
"""
import os
import sys
import django

# Configuration Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from academique.models import Licence, Specialite, Module

def clear_existing_modules():
    """Supprimer tous les modules existants"""
    print("🗑️  Clearing existing modules...")
    Module.objects.all().delete()
    print("✅ All modules cleared")

def populate_detailed_modules():
    print("=== POPULATING DETAILED MODULES ===")

    # Récupérer les licences existantes
    licences = Licence.objects.all()
    if not licences:
        print("❌ Aucune licence trouvée. Veuillez d'abord peupler les licences.")
        return

    # Créer un dictionnaire pour accéder facilement aux licences
    licence_dict = {licence.code: licence for licence in licences}

    # Créer un dictionnaire pour accéder facilement aux spécialités
    specialites = Specialite.objects.all()
    specialite_dict = {}
    for spec in specialites:
        key = f"{spec.licence.code}_{spec.code}"
        specialite_dict[key] = spec

    # Données détaillées des modules
    modules_data = {
        'LSG': {  # Licence Sciences de Gestion
            'L1_S1': [  # Semestre 1 - Tronc commun
                {'nom': 'Principes de Gestion 1', 'code': 'PG101', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Comptabilité Financière 1', 'code': 'CF101', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Microéconomie', 'code': 'MICRO101', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Mathématiques 1', 'code': 'MATH101', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Introduction au Droit', 'code': 'DROIT101', 'type': 'cours', 'credit': 3, 'volume_horaire': 40},
                {'nom': 'Mathématiques Financières', 'code': 'MATHFIN101', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Anglais 1', 'code': 'ANG101', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'C2i1', 'code': 'C2I101', 'type': 'tp', 'credit': 1, 'volume_horaire': 15},
            ],
            'L1_S2': [  # Semestre 2 - Tronc commun
                {'nom': 'Principes de Gestion 1', 'code': 'PG102', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Comptabilité Financière 2', 'code': 'CF102', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Mathématiques 2', 'code': 'MATH102', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Statistique descriptive et calculs de probabilité', 'code': 'STAT101', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Macroéconomie', 'code': 'MACRO101', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Droit des sociétés commerciales', 'code': 'DROITCOM102', 'type': 'cours', 'credit': 3, 'volume_horaire': 40},
                {'nom': 'Anglais 2', 'code': 'ANG102', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'C2i1', 'code': 'C2I102', 'type': 'tp', 'credit': 1, 'volume_horaire': 15},
            ],
            'L2_S3_tronc': [  # Semestre 3 - Tronc commun sauf Comptabilité
                {'nom': 'Fondamentaux du Management', 'code': 'MGT201', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Comptabilité de gestion', 'code': 'CG201', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Fondamentaux du Marketing', 'code': 'MKT201', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Cycle de conférences', 'code': 'CONF201', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Anglais III', 'code': 'ANG201', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Techniques de communication interpersonnelle', 'code': 'COM201', 'type': 'td', 'credit': 2, 'volume_horaire': 25},
                {'nom': 'Fiscalité', 'code': 'FISC201', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Statistique inférentielle', 'code': 'STAT201', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
            ],
            'L2_S4_tronc': [  # Semestre 4 - Tronc commun sauf Comptabilité
                {'nom': 'Fondamentaux de la GRH', 'code': 'GRH202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Diagnostic financier', 'code': 'DIAGFIN202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Gestion de la production', 'code': 'PROD202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Méthodologie d\'élaboration d\'un rapport de stage', 'code': 'STAGE202', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Anglais IV', 'code': 'ANG202', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Coaching d\'équipe et leadership', 'code': 'COACH202', 'type': 'td', 'credit': 2, 'volume_horaire': 25},
                {'nom': 'Transformation digitale de l\'entreprise', 'code': 'DIGITAL202', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Économie d\'affaire', 'code': 'ECO202', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
            ],
            'L2_S3_comp': [  # Semestre 3 - Spécialité Comptabilité
                {'nom': 'Comptabilité intermédiaire 1', 'code': 'CI201', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite': 'COMP'},
                {'nom': 'Comptabilité de gestion', 'code': 'CG201', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'COMP'},
                {'nom': 'IRPP / IS', 'code': 'IRPP201', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'COMP'},
                {'nom': 'Journées thématiques', 'code': 'THEM201', 'type': 'td', 'credit': 2, 'volume_horaire': 30, 'specialite': 'COMP'},
                {'nom': 'Anglais III', 'code': 'ANG201', 'type': 'td', 'credit': 2, 'volume_horaire': 30, 'specialite': 'COMP'},
                {'nom': 'Techniques de communication personnelle', 'code': 'COM201', 'type': 'td', 'credit': 2, 'volume_horaire': 25, 'specialite': 'COMP'},
                {'nom': 'Droit des obligations et des contrats', 'code': 'DROITOBL201', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'COMP'},
                {'nom': 'Diagnostic financier', 'code': 'DIAGFIN201', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'COMP'},
            ],
            'L2_S4_comp': [  # Semestre 4 - Spécialité Comptabilité
                {'nom': 'Comptabilité intermédiaire 2', 'code': 'CI202', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite': 'COMP'},
                {'nom': 'TVA et droit de consommation', 'code': 'TVA202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'COMP'},
                {'nom': 'Méthodologie d\'élaboration d\'un rapport de stage', 'code': 'STAGE202', 'type': 'td', 'credit': 2, 'volume_horaire': 30, 'specialite': 'COMP'},
                {'nom': 'Anglais IV', 'code': 'ANG202', 'type': 'td', 'credit': 2, 'volume_horaire': 30, 'specialite': 'COMP'},
                {'nom': 'Coaching d\'équipe et leadership', 'code': 'COACH202', 'type': 'td', 'credit': 2, 'volume_horaire': 25, 'specialite': 'COMP'},
                {'nom': 'Droit commercial', 'code': 'DROITCOM202', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'COMP'},
                {'nom': 'Techniques de sondage et échantillonnage', 'code': 'SOND202', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'COMP'},
            ],
            'L3_S5_comp': [  # Semestre 5 - Comptabilité
                {'nom': 'Comptabilité avancée', 'code': 'CAV301', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite': 'COMP'},
                {'nom': 'Cadre conceptuel et présentation des états financiers', 'code': 'CCEF301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'COMP'},
                {'nom': 'Contrôle de gestion', 'code': 'CG301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'COMP'},
                {'nom': 'Étude de cas en comptabilité', 'code': 'CASCOMP301', 'type': 'td', 'credit': 3, 'volume_horaire': 40, 'specialite': 'COMP'},
                {'nom': 'Anglais 5', 'code': 'ANG301', 'type': 'td', 'credit': 2, 'volume_horaire': 30, 'specialite': 'COMP'},
                {'nom': 'Culture entrepreneuriale', 'code': 'ENTREP301', 'type': 'td', 'credit': 2, 'volume_horaire': 25, 'specialite': 'COMP'},
                {'nom': 'Avantages fiscaux', 'code': 'FISC301', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'COMP'},
                {'nom': 'Finance internationale', 'code': 'FININT301', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'COMP'},
            ],
            'L3_S6_comp': [  # Semestre 6 - Comptabilité
                {'nom': 'Comptabilité internationale (IFRS)', 'code': 'CIFRS302', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite': 'COMP'},
                {'nom': 'Audit', 'code': 'AUDIT302', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'COMP'},
                {'nom': 'Décisions financières', 'code': 'DECFIN302', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'COMP'},
                {'nom': 'Projet de fin d\'études (PFE)', 'code': 'PFE302', 'type': 'tp', 'credit': 6, 'volume_horaire': 90, 'specialite': 'COMP'},
                {'nom': 'Français : rédaction professionnelle', 'code': 'FR302', 'type': 'td', 'credit': 2, 'volume_horaire': 30, 'specialite': 'COMP'},
                {'nom': 'Progiciels comptables et ERP', 'code': 'ERP302', 'type': 'tp', 'credit': 3, 'volume_horaire': 45, 'specialite': 'COMP'},
                {'nom': 'Procédures collectives', 'code': 'PROCCOLL302', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'COMP'},
                {'nom': 'Comptabilité sectorielle', 'code': 'CSEC302', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'COMP'},
            ],
            'L3_S5_fin': [  # Semestre 5 - Finance
                {'nom': 'Gestion financière internationale', 'code': 'GFI301', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite': 'FIN'},
                {'nom': 'Gestion des institutions financières', 'code': 'GIF301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'FIN'},
                {'nom': 'Économétrie appliquée à la finance', 'code': 'ECONFIN301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'FIN'},
                {'nom': 'Gestion de portefeuille', 'code': 'PORT301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'FIN'},
                {'nom': 'Études de cas en finance', 'code': 'CASFIN301', 'type': 'td', 'credit': 3, 'volume_horaire': 40, 'specialite': 'FIN'},
                {'nom': 'Compétences linguistiques', 'code': 'LANG301', 'type': 'td', 'credit': 2, 'volume_horaire': 30, 'specialite': 'FIN'},
                {'nom': 'Compétences entrepreneuriales', 'code': 'ENTREP301', 'type': 'td', 'credit': 2, 'volume_horaire': 25, 'specialite': 'FIN'},
                {'nom': 'Gestion du fonds de roulement', 'code': 'FDR301', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'FIN'},
                {'nom': 'Gestion de projet', 'code': 'PROJ301', 'type': 'td', 'credit': 3, 'volume_horaire': 35, 'specialite': 'FIN'},
            ],
            'L3_S6_fin': [  # Semestre 6 - Finance
                {'nom': 'Ingénierie financière et montages financiers', 'code': 'INGFIN302', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite': 'FIN'},
                {'nom': 'Politiques financières de l\'entreprise', 'code': 'POLFIN302', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'FIN'},
                {'nom': 'Contrôle de gestion', 'code': 'CG302', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'FIN'},
                {'nom': 'Projet de fin d\'études (PFE)', 'code': 'PFE302', 'type': 'tp', 'credit': 6, 'volume_horaire': 90, 'specialite': 'FIN'},
                {'nom': 'Français : rédaction professionnelle', 'code': 'FR302', 'type': 'td', 'credit': 2, 'volume_horaire': 30, 'specialite': 'FIN'},
                {'nom': 'Gestion du risque de crédit', 'code': 'RISK302', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'FIN'},
                {'nom': 'Banques islamiques', 'code': 'BANQISL302', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'FIN'},
            ],
            'L3_S5_mkt': [  # Semestre 5 - Marketing
                {'nom': 'Stratégie marketing', 'code': 'STRATMKT301', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite': 'MKT'},
                {'nom': 'Gestion des prix et des produits', 'code': 'PRIX301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'MKT'},
                {'nom': 'Recherche marketing', 'code': 'RMKT301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'MKT'},
                {'nom': 'Analyse du comportement du consommateur', 'code': 'COMPORT301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'MKT'},
                {'nom': 'Études de cas en marketing', 'code': 'CASMKT301', 'type': 'td', 'credit': 3, 'volume_horaire': 40, 'specialite': 'MKT'},
                {'nom': 'Anglais V', 'code': 'ANG301', 'type': 'td', 'credit': 2, 'volume_horaire': 30, 'specialite': 'MKT'},
                {'nom': 'Négociation et gestion des conflits', 'code': 'NEGOC301', 'type': 'td', 'credit': 2, 'volume_horaire': 25, 'specialite': 'MKT'},
                {'nom': 'Marketing digital', 'code': 'DMKT301', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'MKT'},
                {'nom': 'Éthique du marketing et RSE', 'code': 'ETHMKT301', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'MKT'},
            ],
            'L3_S6_mkt': [  # Semestre 6 - Marketing
                {'nom': 'Stratégies de distribution', 'code': 'DIST302', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite': 'MKT'},
                {'nom': 'Communication marketing', 'code': 'COMMKT302', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'MKT'},
                {'nom': 'Analyse des données marketing', 'code': 'DATAMKT302', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'MKT'},
                {'nom': 'Projet de fin d\'études (PFE)', 'code': 'PFE302', 'type': 'tp', 'credit': 6, 'volume_horaire': 90, 'specialite': 'MKT'},
                {'nom': 'Techniques d\'expression française', 'code': 'EXPRFR302', 'type': 'td', 'credit': 2, 'volume_horaire': 30, 'specialite': 'MKT'},
                {'nom': 'Développement des sites web', 'code': 'WEB302', 'type': 'tp', 'credit': 3, 'volume_horaire': 45, 'specialite': 'MKT'},
                {'nom': 'Marketing de la relation client', 'code': 'CRM302', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'MKT'},
                {'nom': 'Web analytics et performance', 'code': 'ANALYTICS302', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'MKT'},
            ],
            'L3_S5_mgmt': [  # Semestre 5 - Management
                {'nom': 'Théorie des organisations', 'code': 'THEORG301', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite': 'MGMT'},
                {'nom': 'Analyses quantitatives et qualitatives', 'code': 'ANAQUANT301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'MGMT'},
                {'nom': 'Management de projet', 'code': 'MGTPROJ301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'MGMT'},
                {'nom': 'Management de la qualité et certification', 'code': 'QUAL301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'MGMT'},
                {'nom': 'Étude de cas en management', 'code': 'CASMGT301', 'type': 'td', 'credit': 3, 'volume_horaire': 40, 'specialite': 'MGMT'},
                {'nom': 'Anglais V', 'code': 'ANG301', 'type': 'td', 'credit': 2, 'volume_horaire': 30, 'specialite': 'MGMT'},
                {'nom': 'Négociation et gestion des conflits', 'code': 'NEGOC301', 'type': 'td', 'credit': 2, 'volume_horaire': 25, 'specialite': 'MGMT'},
                {'nom': 'Management du risque et intelligence économique', 'code': 'RISKMGT301', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'MGMT'},
                {'nom': 'Responsabilité sociale et développement durable', 'code': 'RSE301', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'MGMT'},
            ],
            'L3_S6_mgmt': [  # Semestre 6 - Management
                {'nom': 'Management de l\'innovation et entrepreneuriat', 'code': 'INNOV302', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite': 'MGMT'},
                {'nom': 'Management de la transformation digitale et SI', 'code': 'DIGITAL302', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'MGMT'},
                {'nom': 'Management stratégique', 'code': 'STRAT302', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'MGMT'},
                {'nom': 'Contrôle de gestion', 'code': 'CG302', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'MGMT'},
                {'nom': 'Projet de fin d\'études (PFE)', 'code': 'PFE302', 'type': 'tp', 'credit': 6, 'volume_horaire': 90, 'specialite': 'MGMT'},
                {'nom': 'Anglais VI', 'code': 'ANG302', 'type': 'td', 'credit': 2, 'volume_horaire': 30, 'specialite': 'MGMT'},
                {'nom': 'Développement des sites web', 'code': 'WEB302', 'type': 'tp', 'credit': 3, 'volume_horaire': 45, 'specialite': 'MGMT'},
                {'nom': 'Gouvernance d\'entreprise', 'code': 'GOV302', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'MGMT'},
                {'nom': 'Création et pilotage d\'une start-up', 'code': 'STARTUP302', 'type': 'td', 'credit': 3, 'volume_horaire': 35, 'specialite': 'MGMT'},
            ],
        },
        'LECO': {  # Licence Sciences Économiques
            'L1_S1': [
                {'nom': 'Principes d\'économie', 'code': 'PRINCECO101', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Comptabilité financière 1', 'code': 'CF101', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Analyse', 'code': 'ANALYSE101', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Statistiques descriptives et probabilités', 'code': 'STAT101', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Anglais des affaires', 'code': 'ANGAFF101', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Français des affaires', 'code': 'FRAFF101', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'C2i1', 'code': 'C2I101', 'type': 'tp', 'credit': 1, 'volume_horaire': 15},
            ],
            'L1_S2': [
                {'nom': 'Microéconomie', 'code': 'MICRO102', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Macroéconomie', 'code': 'MACRO102', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Comptabilité financière 2', 'code': 'CF102', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Algèbre', 'code': 'ALGEBRE102', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Principes de droit', 'code': 'DROIT102', 'type': 'cours', 'credit': 3, 'volume_horaire': 40},
                {'nom': 'Anglais des affaires', 'code': 'ANGAFF102', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Français des affaires', 'code': 'FRAFF102', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'C2i1', 'code': 'C2I102', 'type': 'tp', 'credit': 1, 'volume_horaire': 15},
            ],
            'L2_S3': [
                {'nom': 'Microéconomie 2', 'code': 'MICRO201', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Macroéconomie 2', 'code': 'MACRO201', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Histoire des faits et de la pensée économique', 'code': 'HISTECO201', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Conférences carrières', 'code': 'CONF201', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Les métiers de l\'économiste', 'code': 'METIERS201', 'type': 'td', 'credit': 2, 'volume_horaire': 25},
                {'nom': 'Anglais des affaires', 'code': 'ANGAFF201', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Français des affaires', 'code': 'FRAFF201', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Culture entrepreneuriale', 'code': 'ENTREP201', 'type': 'td', 'credit': 2, 'volume_horaire': 25},
                {'nom': 'Recherche opérationnelle', 'code': 'RO201', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Comptabilité nationale', 'code': 'CN201', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
            ],
            'L2_S4': [
                {'nom': 'Économie internationale', 'code': 'ECOINT202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Économie industrielle', 'code': 'ECOINDS202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Économie monétaire', 'code': 'ECOMON202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Statistique inférentielle', 'code': 'STAT202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Méthodologie d\'élaboration d\'un rapport de stage', 'code': 'STAGE202', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Anglais des affaires', 'code': 'ANGAFF202', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Business model', 'code': 'BMODEL202', 'type': 'td', 'credit': 2, 'volume_horaire': 25},
                {'nom': 'Macroéconomie internationale', 'code': 'MACROINT202', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Calcul économique', 'code': 'CALCECO202', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
            ],
            'L3_S5': [
                {'nom': 'Initiation à l\'économétrie', 'code': 'ECONOMETRIE301', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Économie de la banque et assurance', 'code': 'ECOBANQ301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Droit des institutions financières', 'code': 'DROITFIN301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Macroéconomie monétaire', 'code': 'MACROMON301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Étude de cas en économie', 'code': 'CASECO301', 'type': 'td', 'credit': 3, 'volume_horaire': 40},
                {'nom': 'Business English', 'code': 'BENG301', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Développement personnel', 'code': 'DEV301', 'type': 'td', 'credit': 2, 'volume_horaire': 25},
                {'nom': 'Gestion bancaire', 'code': 'GESTBANQ301', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Analyse de la conjoncture nationale', 'code': 'CONJ301', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
            ],
            'L3_S6': [
                {'nom': 'Enquête et sondage', 'code': 'ENQUETE302', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Finance internationale', 'code': 'FININT302', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Techniques financières actuarielles', 'code': 'ACTU302', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Élaboration et validation du PFE', 'code': 'PFE302', 'type': 'tp', 'credit': 6, 'volume_horaire': 90},
                {'nom': 'Business English', 'code': 'BENG302', 'type': 'td', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Analyse et évaluation des projets', 'code': 'EVALPROJ302', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Marchés financiers et gestion de portefeuille', 'code': 'MARCHFIN302', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Logiciels pour l\'économie et la finance', 'code': 'LOGICIELS302', 'type': 'tp', 'credit': 3, 'volume_horaire': 45},
            ],
        },
        'LIG': {  # Licence Informatique de Gestion (Business Intelligence)
            'L1_S1': [
                {'nom': 'Algorithmique et structures de données 1', 'code': 'ALGO101', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Systèmes d\'exploitation', 'code': 'SE101', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Architecture des ordinateurs', 'code': 'ARCHI101', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Analyse', 'code': 'ANALYSE101', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Statistiques et probabilités', 'code': 'STAT101', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Principes de gestion', 'code': 'GESTION101', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Comptabilité générale', 'code': 'COMP101', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Compétences numériques', 'code': 'CNUM101', 'type': 'tp', 'credit': 2, 'volume_horaire': 30},
                {'nom': 'Business communication', 'code': 'BCOMM101', 'type': 'td', 'credit': 2, 'volume_horaire': 25},
                {'nom': 'Développement personnel', 'code': 'DPERS101', 'type': 'td', 'credit': 1, 'volume_horaire': 15},
                {'nom': 'Travail collaboratif', 'code': 'TCOLL101', 'type': 'td', 'credit': 1, 'volume_horaire': 15},
                {'nom': 'Interface homme-machine', 'code': 'IHM101', 'type': 'tp', 'credit': 2, 'volume_horaire': 30},
            ],
            'L1_S2': [
                {'nom': 'Algorithmique et structures de données 2', 'code': 'ALGO102', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Réseaux', 'code': 'RESEAUX102', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Introduction aux systèmes d\'information', 'code': 'SI102', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Logique mathématique', 'code': 'LOGIQUE102', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Algèbre', 'code': 'ALGEBRE102', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Système d\'information comptable', 'code': 'SIC102', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Gestion financière', 'code': 'GF102', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Business communication 2', 'code': 'BCOMM102', 'type': 'td', 'credit': 2, 'volume_horaire': 25},
                {'nom': 'Droit de l\'informatique', 'code': 'DROITINFO102', 'type': 'cours', 'credit': 2, 'volume_horaire': 25},
                {'nom': 'Erasmus modules', 'code': 'ERASMUS102', 'type': 'td', 'credit': 1, 'volume_horaire': 15},
            ],
            'L2_S3': [
                {'nom': 'Programmation orientée objet', 'code': 'POO201', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Programmation web 1', 'code': 'WEB201', 'type': 'tp', 'credit': 4, 'volume_horaire': 60},
                {'nom': 'Conception OO des SI', 'code': 'OO201', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Bases de données', 'code': 'BDD201', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Statistiques inférentielles', 'code': 'STAT201', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Fondements de l\'IA', 'code': 'IA201', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Marketing digital', 'code': 'DMKT201', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Économie numérique', 'code': 'ENUM201', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Éthique et lois IT', 'code': 'ETHIT201', 'type': 'td', 'credit': 2, 'volume_horaire': 25},
                {'nom': 'Projet professionnel (PPP)', 'code': 'PPP201', 'type': 'tp', 'credit': 3, 'volume_horaire': 45},
                {'nom': 'Erasmus modules', 'code': 'ERASMUS201', 'type': 'td', 'credit': 1, 'volume_horaire': 15},
            ],
            'L2_S4': [
                {'nom': 'Analyse et fouille de données', 'code': 'FOUILLE202', 'type': 'cours', 'credit': 5, 'volume_horaire': 50},
                {'nom': 'Programmation web 2', 'code': 'WEB202', 'type': 'tp', 'credit': 4, 'volume_horaire': 60},
                {'nom': 'Théorie des graphes', 'code': 'GRAPHES202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Génie logiciel (AGL)', 'code': 'AGL202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Architecture logicielle', 'code': 'ARCHLOG202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'SGBD', 'code': 'SGBD202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Data warehouse', 'code': 'DW202', 'type': 'cours', 'credit': 4, 'volume_horaire': 45},
                {'nom': 'Entreprenariat', 'code': 'ENTREP202', 'type': 'td', 'credit': 2, 'volume_horaire': 25},
                {'nom': 'Gestion de projet', 'code': 'PROJ202', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Optimisation non linéaire', 'code': 'OPTIM202', 'type': 'cours', 'credit': 3, 'volume_horaire': 35},
                {'nom': 'Processus unifié', 'code': 'RUP202', 'type': 'td', 'credit': 2, 'volume_horaire': 25},
                {'nom': 'Erasmus modules', 'code': 'ERASMUS202', 'type': 'td', 'credit': 1, 'volume_horaire': 15},
            ],
            'L3_S5': [
                {'nom': 'Techniques de prévision', 'code': 'PREVISION301', 'type': 'cours', 'credit': 5, 'volume_horaire': 50, 'specialite': 'BI'},
                {'nom': 'Théorie de décision', 'code': 'DECISION301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'BI'},
                {'nom': 'Big Data & Cloud', 'code': 'BIGDATA301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'BI'},
                {'nom': 'Développement mobile', 'code': 'MOBILE301', 'type': 'tp', 'credit': 4, 'volume_horaire': 60, 'specialite': 'BI'},
                {'nom': 'ERP / SCM', 'code': 'ERP301', 'type': 'cours', 'credit': 4, 'volume_horaire': 45, 'specialite': 'BI'},
                {'nom': 'Sécurité IT', 'code': 'SEC301', 'type': 'cours', 'credit': 3, 'volume_horaire': 35, 'specialite': 'BI'},
                {'nom': 'Programmation avancée BI', 'code': 'BIPROG301', 'type': 'tp', 'credit': 4, 'volume_horaire': 60, 'specialite': 'BI'},
                {'nom': 'Leadership', 'code': 'LEAD301', 'type': 'td', 'credit': 2, 'volume_horaire': 25, 'specialite': 'BI'},
                {'nom': 'Psychology & sociology (anglais)', 'code': 'PSYCHO301', 'type': 'td', 'credit': 2, 'volume_horaire': 25, 'specialite': 'BI'},
                {'nom': 'Erasmus modules', 'code': 'ERASMUS301', 'type': 'td', 'credit': 1, 'volume_horaire': 15, 'specialite': 'BI'},
            ],
            'L3_S6': [
                {'nom': 'Stage en entreprise', 'code': 'STAGE302', 'type': 'tp', 'credit': 20, 'volume_horaire': 300, 'specialite': 'BI'},
            ],
        }
    }

    total_modules = 0

    for licence_code, semestres in modules_data.items():
        try:
            licence = licence_dict[licence_code]
            print(f"\n📚 Processing licence: {licence.nom} ({licence_code})")

            for semestre_key, modules_list in semestres.items():
                # Parser la clé du semestre (ex: 'L1_S1', 'L2_S3_comp', etc.)
                parts = semestre_key.split('_')
                annee = parts[0]  # L1, L2, L3
                semestre = parts[1]  # S1, S2, S3, etc.
                specialite_code = parts[2] if len(parts) > 2 else None

                # Déterminer la spécialité si spécifiée
                specialite = None
                if specialite_code:
                    spec_key = f"{licence_code}_{specialite_code}"
                    specialite = specialite_dict.get(spec_key)

                print(f"  📘 {annee} {semestre}" + (f" - {specialite.nom}" if specialite else ""))

                for module_data in modules_list:
                    # Créer le module
                    module, created = Module.objects.get_or_create(
                        code=module_data['code'],
                        defaults={
                            'nom': module_data['nom'],
                            'coefficient': 1.0,
                            'credit': module_data['credit'],
                            'volume_horaire': module_data['volume_horaire'],
                            'type': module_data['type'],
                            'semestre': semestre,
                            'annee': annee,
                            'licence': licence,
                            'specialite': specialite,
                        }
                    )

                    if created:
                        status = "✓ Created"
                        total_modules += 1
                    else:
                        status = "⏭️  Skipped (exists)"

                    print(f"    {status} {module.nom} ({module.code}) - {module.credit} crédits")

        except KeyError:
            print(f"❌ Licence {licence_code} not found, skipping...")

    print("\n=== SUMMARY ===")
    print(f"Total modules: {Module.objects.count()}")

    # Afficher la structure détaillée
    print("\n=== DETAILED STRUCTURE ===")
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
                        # Grouper par spécialité
                        modules_by_spec = {}
                        for module in modules_semestre:
                            spec_name = module.specialite.nom if module.specialite else "Tronc commun"
                            if spec_name not in modules_by_spec:
                                modules_by_spec[spec_name] = []
                            modules_by_spec[spec_name].append(module)

                        for spec_name, spec_modules in modules_by_spec.items():
                            if spec_name != "Tronc commun":
                                print(f"      🔸 {spec_name}:")
                            for module in spec_modules:
                                print(f"        └─ {module.nom} ({module.code}) - {module.credit} crédits")

if __name__ == '__main__':
    clear_existing_modules()
    populate_detailed_modules()