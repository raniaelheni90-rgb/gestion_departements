from django.db import models


class Etudiant(models.Model):
    idEtudiant = models.AutoField(primary_key=True)
    cin = models.CharField(max_length=8, unique=True)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    numTel = models.CharField(max_length=8)
    dateNaissance = models.DateField()
    adresse = models.CharField(max_length=100)
    dateInscription = models.DateField()

    def __str__(self):
        return f"{self.nom} {self.prenom}"
