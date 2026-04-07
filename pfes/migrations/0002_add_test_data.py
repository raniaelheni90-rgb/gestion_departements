# Generated migration for adding test data

from django.db import migrations
from datetime import date


def add_test_data(apps, schema_editor):
    """Add test data to PFE, Jury and related tables"""
    
    Enseignant = apps.get_model('enseignants', 'Enseignant')
    Etudiant = apps.get_model('etudiants', 'Etudiant')
    Jury = apps.get_model('pfes', 'Jury')
    PFE = apps.get_model('pfes', 'PFE')
    PFEStudent = apps.get_model('pfes', 'PFEStudent')
    
    # Create test teachers if they don't exist
    teachers = []
    teacher_data = [
        {
            'matricule': 'PROF001',
            'cin': '12345678',
            'nom': 'Dupont',
            'prenom': 'Jean',
            'email': 'jean.dupont@example.com',
            'numtel': '0612345678',
            'grade': 'Professeur',
            'dateRecrutement': date(2015, 9, 1),
        },
        {
            'matricule': 'PROF002',
            'cin': '23456789',
            'nom': 'Martin',
            'prenom': 'Marie',
            'email': 'marie.martin@example.com',
            'numtel': '0623456789',
            'grade': 'Maître de Conférences',
            'dateRecrutement': date(2018, 3, 15),
        },
        {
            'matricule': 'PROF003',
            'cin': '34567890',
            'nom': 'Bernard',
            'prenom': 'Pierre',
            'email': 'pierre.bernard@example.com',
            'numtel': '0634567890',
            'grade': 'Maître de Conférences',
            'dateRecrutement': date(2016, 10, 1),
        },
        {
            'matricule': 'PROF004',
            'cin': '45678901',
            'nom': 'Leclerc',
            'prenom': 'Sophie',
            'email': 'sophie.leclerc@example.com',
            'numtel': '0645678901',
            'grade': 'Professeur',
            'dateRecrutement': date(2014, 1, 20),
        },
    ]
    
    for t_data in teacher_data:
        if not Enseignant.objects.filter(matricule=t_data['matricule']).exists():
            Enseignant.objects.create(**t_data)
        teachers.append(Enseignant.objects.get(matricule=t_data['matricule']))
    
    # Create test students if they don't exist
    students = []
    student_data = [
        {
            'cin': '87654321',
            'nom': 'Lefevre',
            'prenom': 'Luc',
            'email': 'luc.lefevre@student.com',
            'numTel': '12345678',
            'dateNaissance': date(2002, 5, 10),
            'adresse': '123 Rue des Fleurs',
        },
        {
            'cin': '76543210',
            'nom': 'Rousseau',
            'prenom': 'Claire',
            'email': 'claire.rousseau@student.com',
            'numTel': '87654321',
            'dateNaissance': date(2001, 8, 22),
            'adresse': '456 Avenue du Parc',
        },
        {
            'cin': '65432109',
            'nom': 'Moreau',
            'prenom': 'Thomas',
            'email': 'thomas.moreau@student.com',
            'numTel': '65432109',
            'dateNaissance': date(2002, 3, 15),
            'adresse': '789 Boulevard des Lauriers',
        },
        {
            'cin': '54321098',
            'nom': 'Petit',
            'prenom': 'Isabelle',
            'email': 'isabelle.petit@student.com',
            'numTel': '54321098',
            'dateNaissance': date(2001, 11, 30),
            'adresse': '321 Chemin de la Liberté',
        },
    ]
    
    for s_data in student_data:
        if not Etudiant.objects.filter(cin=s_data['cin']).exists():
            Etudiant.objects.create(**s_data)
        students.append(Etudiant.objects.get(cin=s_data['cin']))
    
    # Create test juries
    juries = []
    
    # Jury 1: Professeurs 1, 2, 3
    if not Jury.objects.filter(titre='Jury Informatique - Équipe A').exists():
        jury1 = Jury.objects.create(titre='Jury Informatique - Équipe A')
        jury1.enseignants.add(teachers[0], teachers[1], teachers[2])
    else:
        jury1 = Jury.objects.get(titre='Jury Informatique - Équipe A')
    juries.append(jury1)
    
    # Jury 2: Professeurs 2, 3, 4
    if not Jury.objects.filter(titre='Jury Informatique - Équipe B').exists():
        jury2 = Jury.objects.create(titre='Jury Informatique - Équipe B')
        jury2.enseignants.add(teachers[1], teachers[2], teachers[3])
    else:
        jury2 = Jury.objects.get(titre='Jury Informatique - Équipe B')
    juries.append(jury2)
    
    # Jury 3: Professeurs 1, 4
    if not Jury.objects.filter(titre='Jury Réseaux et Sécurité').exists():
        jury3 = Jury.objects.create(titre='Jury Réseaux et Sécurité')
        jury3.enseignants.add(teachers[0], teachers[3])
    else:
        jury3 = Jury.objects.get(titre='Jury Réseaux et Sécurité')
    juries.append(jury3)
    
    # Create test PFEs
    pfe_data = [
        {
            'sujet': 'Développement d\'une application web de gestion de contenus',
            'duree': 6,
            'specialite': 'Informatique',
            'encadrant': teachers[0],
            'jury': juries[0],
            'etudiants': [students[0], students[1]],
        },
        {
            'sujet': 'Système de recommandation basé sur l\'intelligence artificielle',
            'duree': 6,
            'specialite': 'Data Science',
            'encadrant': teachers[1],
            'jury': juries[1],
            'etudiants': [students[2]],
        },
        {
            'sujet': 'Plateforme de commerce électronique sécurisée',
            'duree': 5,
            'specialite': 'Informatique',
            'encadrant': teachers[2],
            'jury': juries[0],
            'etudiants': [students[3]],
        },
        {
            'sujet': 'Analyse de flux réseau temps réel',
            'duree': 6,
            'specialite': 'Réseaux',
            'encadrant': teachers[3],
            'jury': juries[2],
            'etudiants': [],
        },
        {
            'sujet': 'Application mobile pour gestion des stocks',
            'duree': 7,
            'specialite': 'Informatique',
            'encadrant': teachers[0],
            'jury': juries[1],
            'etudiants': [],
        },
    ]
    
    for pfe_info in pfe_data:
        etudiants_list = pfe_info.pop('etudiants')
        
        if not PFE.objects.filter(sujet=pfe_info['sujet']).exists():
            pfe = PFE.objects.create(**pfe_info)
            
            # Add students to PFE
            for etudiant in etudiants_list:
                if not PFEStudent.objects.filter(pfe=pfe, etudiant=etudiant).exists():
                    PFEStudent.objects.create(pfe=pfe, etudiant=etudiant)


def remove_test_data(apps, schema_editor):
    """Remove test data (optional)"""
    
    Jury = apps.get_model('pfes', 'Jury')
    PFE = apps.get_model('pfes', 'PFE')
    
    # Delete PFEs with test subjects
    test_subjects = [
        'Développement d\'une application web de gestion de contenus',
        'Système de recommandation basé sur l\'intelligence artificielle',
        'Plateforme de commerce électronique sécurisée',
        'Analyse de flux réseau temps réel',
        'Application mobile pour gestion des stocks',
    ]
    PFE.objects.filter(sujet__in=test_subjects).delete()
    
    # Delete test juries
    test_jury_titles = [
        'Jury Informatique - Équipe A',
        'Jury Informatique - Équipe B',
        'Jury Réseaux et Sécurité',
    ]
    Jury.objects.filter(titre__in=test_jury_titles).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('pfes', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_test_data, remove_test_data),
    ]
