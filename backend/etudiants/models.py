from django.db import models

class Etudiant(models.Model):
    idEtudiant = models.AutoField(primary_key=True)
    cin = models.CharField(max_length=8, unique=True)

    passport = models.CharField(max_length=20, unique=True, null=True, blank=True)
    nationalite = models.CharField(max_length=50, null=True, blank=True)

    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    numTel = models.CharField(max_length=20)
    dateNaissance = models.DateField()
    adresse = models.CharField(max_length=100)

    licence = models.ForeignKey(
        'academique.Licence',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='etudiants',
    )
    specialite = models.ForeignKey(
        'academique.Specialite',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='etudiants',
    )

    def __str__(self):
        return f"{self.nom} {self.prenom}"