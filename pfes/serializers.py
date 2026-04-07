from rest_framework import serializers
from enseignants.serializers import EnseignantSerializer
from enseignants.models import Enseignant
from etudiants.serializers import EtudiantSerializer
from etudiants.models import Etudiant
from .models import Jury, PFE


class JurySerializer(serializers.ModelSerializer):
    enseignants = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Enseignant.objects.all(),
    )
    enseignants_detail = EnseignantSerializer(source='enseignants', many=True, read_only=True)

    class Meta:
        model = Jury
        fields = ['idJury', 'titre', 'enseignants', 'enseignants_detail']

    def validate_enseignants(self, value):
        if len(value) < 2 or len(value) > 3:
            raise serializers.ValidationError('Le jury doit contenir 2 ou 3 enseignants.')
        return value

    def create(self, validated_data):
        enseignants_data = validated_data.pop('enseignants', [])
        jury = Jury.objects.create(**validated_data)
        jury.enseignants.set(enseignants_data)
        return jury

    def update(self, instance, validated_data):
        enseignants_data = validated_data.pop('enseignants', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if enseignants_data is not None:
            instance.enseignants.set(enseignants_data)
        return instance


class PFESerializer(serializers.ModelSerializer):
    etudiants = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Etudiant.objects.all(),
    )
    etudiants_detail = EtudiantSerializer(source='etudiants', many=True, read_only=True)
    encadrant = serializers.PrimaryKeyRelatedField(
        queryset=Enseignant.objects.all(),
    )
    encadrant_detail = EnseignantSerializer(source='encadrant', read_only=True)
    jury = serializers.PrimaryKeyRelatedField(
        queryset=Jury.objects.all(),
    )
    jury_detail = JurySerializer(source='jury', read_only=True)

    class Meta:
        model = PFE
        fields = [
            'idPfe',
            'sujet',
            'duree',
            'specialite',
            'etudiants',
            'etudiants_detail',
            'encadrant',
            'encadrant_detail',
            'jury',
            'jury_detail',
        ]

    def validate_etudiants(self, value):
        if len(value) < 1 or len(value) > 2:
            raise serializers.ValidationError('Un PFE doit avoir 1 ou 2 étudiants.')
        return value

    def validate(self, attrs):
        etudiants = attrs.get('etudiants')
        if self.instance and etudiants is None:
            etudiants = self.instance.etudiants.all()

        if not etudiants:
            raise serializers.ValidationError('La liste des étudiants ne peut pas être vide.')

        for etudiant in etudiants:
            existing_pfe = etudiant.pfes.first()
            if existing_pfe is not None and existing_pfe != self.instance:
                raise serializers.ValidationError(
                    f"L'étudiant {etudiant} est déjà associé au PFE {existing_pfe.idPfe}."
                )

        return attrs

    def create(self, validated_data):
        etudiants_data = validated_data.pop('etudiants', [])
        pfe = PFE.objects.create(**validated_data)
        pfe.etudiants.set(etudiants_data)
        return pfe

    def update(self, instance, validated_data):
        etudiants_data = validated_data.pop('etudiants', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if etudiants_data is not None:
            instance.etudiants.set(etudiants_data)
        return instance
