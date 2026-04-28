import os
import django
from datetime import date, time, timedelta
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gestion_departements.settings')
django.setup()

from django.contrib.auth.models import User
from enseignants.models import Enseignant
from etudiants.models import Etudiant
from pfes.models import Rapporteur, PFE, Soutenance, PFEStudent
from academique.models import Departement

def populate_pfes():
    print("=== POPULATING ENSEIGNANTS, RAPPORTEURS, PFEs, SOUTENANCES ===")

    # Ensure we have a department
    dept = Departement.objects.first()

    # 1. Create Enseignants (Encadrants & Rapporteurs)
    enseignants_data = [
        {"matricule": "ENC001", "nom": "Benali", "prenom": "Mohammed", "email": "m.benali@univ.ma", "role": "enseignant"},
        {"matricule": "ENC002", "nom": "Chaoui", "prenom": "Meryem", "email": "m.chaoui@univ.ma", "role": "enseignant"},
        {"matricule": "ENC003", "nom": "Idrissi", "prenom": "Yassine", "email": "y.idrissi@univ.ma", "role": "enseignant"},
    ]

    created_enseignants = []
    for data in enseignants_data:
        user, _ = User.objects.get_or_create(username=data["matricule"].lower(), defaults={"email": data["email"]})
        user.set_password("pass123")
        user.save()

        ens, _ = Enseignant.objects.update_or_create(
            matricule=data["matricule"],
            defaults={
                "user": user,
                "cin": f"C{random.randint(100000, 999999)}",
                "nom": data["nom"],
                "prenom": data["prenom"],
                "email": data["email"],
                "role": data["role"],
                "departement": dept,
                "dateRecrutement": date(2015, 9, 1)
            }
        )
        created_enseignants.append(ens)
        print(f"✓ Enseignant: {ens.nom} {ens.prenom}")

    # 2. Create standalone Rapporteurs
    rapporteurs_data = [
        {"matricule": "RAP001", "cin": "R123456", "nom": "Tahiri", "prenom": "Khalid", "email": "k.tahiri@univ.ma", "grade": "Professeur de l'Enseignement Supérieur"},
        {"matricule": "RAP002", "cin": "R654321", "nom": "Mansouri", "prenom": "Hajar", "email": "h.mansouri@univ.ma", "grade": "Professeur Habilité"},
    ]

    for data in rapporteurs_data:
        rap, _ = Rapporteur.objects.update_or_create(
            matricule=data["matricule"],
            defaults={
                "cin": data["cin"],
                "nom": data["nom"],
                "prenom": data["prenom"],
                "email": data["email"],
                "numtel": f"06{random.randint(10000000, 99999999)}",
                "grade": data["grade"],
                "dateRecrutement": date(2010, 9, 1)
            }
        )
        print(f"✓ Rapporteur: {rap.nom} {rap.prenom}")

    # 3. Create PFEs
    etudiants = list(Etudiant.objects.all()[:6]) # Get 6 students
    
    if len(etudiants) < 2:
        print("❌ Not enough students to create PFEs. Run populate_etudiants.py first.")
        return

    pfes_data = [
        {"sujet": "Application de gestion des ressources humaines", "specialite": "Informatique de Gestion", "etudiants": etudiants[0:2], "encadrant": created_enseignants[0]},
        {"sujet": "Analyse de l'impact du marketing digital sur les ventes", "specialite": "Marketing", "etudiants": [etudiants[2]], "encadrant": created_enseignants[1]},
        {"sujet": "Système de recommandation basé sur l'IA", "specialite": "Business Intelligence", "etudiants": etudiants[3:5], "encadrant": created_enseignants[2]},
    ]

    created_pfes = []
    for data in pfes_data:
        pfe = PFE.objects.create(
            sujet=data["sujet"],
            duree=3,
            specialite=data["specialite"],
            encadrant=data["encadrant"],
            date_affectation=date.today() - timedelta(days=60)
        )
        for etu in data["etudiants"]:
            PFEStudent.objects.create(pfe=pfe, etudiant=etu)
        
        created_pfes.append(pfe)
        print(f"✓ PFE: {pfe.sujet} (Encadré par {pfe.encadrant.nom})")

    # 4. Create Soutenances
    for i, pfe in enumerate(created_pfes):
        # We need an enseignant to act as rapporteur for the soutenance model
        rapporteur_ens = created_enseignants[(i + 1) % len(created_enseignants)] 
        
        soutenance = Soutenance.objects.create(
            pfe=pfe,
            date_soutenance=date.today() + timedelta(days=i),
            heure_soutenance=time(9 + i, 0),
            duree=60,
            salle=f"Salle {101 + i}",
            encadrant=pfe.encadrant,
            rapporteur=rapporteur_ens
        )
        soutenance.etudiants.set(pfe.etudiants.all())
        print(f"✓ Soutenance: PFE {pfe.idPfe} le {soutenance.date_soutenance} en {soutenance.salle}")

    print("\n✅ Done populating PFEs and related data!")

if __name__ == '__main__':
    populate_pfes()
