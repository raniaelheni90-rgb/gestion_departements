from django.db import models
from django.core.exceptions import ValidationError
from enseignants.models import Enseignant
from etudiants.models import Etudiant


class Jury(models.Model):
    idJury = models.AutoField(primary_key=True)
    titre = models.CharField(max_length=150)
    enseignants = models.ManyToManyField(Enseignant, related_name='jurys')

    def __str__(self):
        return f"Jury {self.idJury} - {self.titre}"

    def clean(self):
        enseignants_count = self.enseignants.count()
        if enseignants_count < 2 or enseignants_count > 3:
            raise ValidationError('Un jury doit contenir 2 ou 3 enseignants.')


class PFE(models.Model):
    idPfe = models.AutoField(primary_key=True)
    sujet = models.CharField(max_length=250)
    duree = models.PositiveIntegerField(help_text='Durée en mois ou unité métier')
    specialite = models.CharField(max_length=150)
    encadrant = models.ForeignKey(
        Enseignant,
        on_delete=models.PROTECT,
        related_name='pfes_encadres'
    )
    jury = models.ForeignKey(
        Jury,
        on_delete=models.PROTECT,
        related_name='pfes'
    )
    etudiants = models.ManyToManyField(
        Etudiant,
        through='PFEStudent',
        related_name='pfes'
    )

    def __str__(self):
        return f"PFE {self.idPfe} - {self.sujet[:40]}"


class PFEStudent(models.Model):
    pfe = models.ForeignKey(PFE, on_delete=models.CASCADE, related_name='participants')
    etudiant = models.OneToOneField(Etudiant, on_delete=models.PROTECT, related_name='pfe_assignment')

    class Meta:
        verbose_name = 'Affectation étudiant PFE'
        verbose_name_plural = 'Affectations étudiants PFE'

    def __str__(self):
        return f"{self.etudiant} -> {self.pfe}"
