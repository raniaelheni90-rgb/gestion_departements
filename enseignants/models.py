from django.db import models


class Enseignant(models.Model):
    matricule = models.CharField(max_length=20, primary_key=True)
    cin = models.CharField(max_length=8, unique=True)
    nom = models.CharField(max_length=20)
    prenom = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    numtel = models.CharField(max_length=20)
    grade = models.CharField(max_length=50)
    dateRecrutement = models.DateField()

    def __str__(self):
        return f"{self.nom} {self.prenom}"


class Diplome(models.Model):
    idDiplome = models.AutoField(primary_key=True)
    libelleDiplome = models.CharField(max_length=100)
    specialite = models.CharField(max_length=100)
    dateObtention = models.DateField()

    enseignant = models.ForeignKey(
        Enseignant,
        on_delete=models.CASCADE,
        related_name="diplomes"
    )

    def __str__(self):
        return self.libelleDiplome


class Titre(models.Model):
    idTitre = models.AutoField(primary_key=True)
    dateDebutTitre = models.DateField()

    enseignant = models.ForeignKey(
        Enseignant,
        on_delete=models.CASCADE,
        related_name="titres"
    )


class Permanent(Titre):
    dateTitularisation = models.DateField()
    statutAdministratif = models.CharField(max_length=100)


class Vacataire(Titre):
    nbHeures = models.IntegerField()
    tauxHoraire = models.FloatField()


class Contractuel(Titre):
    dureeContrat = models.IntegerField()
    dateDebutContrat = models.DateField()
    dateFinContrat = models.DateField()


class ContratDocteur(models.Model):
    contractuel = models.OneToOneField(
        Contractuel,
        on_delete=models.CASCADE,
        primary_key=True
    )

    primeRecherche = models.FloatField()


class ContratDoctorant(models.Model):
    contractuel = models.OneToOneField(
        Contractuel,
        on_delete=models.CASCADE,
        primary_key=True
    )

    sujetThese = models.CharField(max_length=200)
    universiteInscription = models.CharField(max_length=150)
    anneeThese = models.IntegerField()
