import re
from django.db import transaction
from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import openpyxl

from enseignants.models import Enseignant
from etudiants.models import Etudiant
from .models import Jury, PFE
from .serializers import JurySerializer, PFESerializer


def normalize_header(value):
    if value is None:
        return ''
    header = str(value).strip().lower()
    header = re.sub(r'[\s_\-]+', '', header)
    header = re.sub(r'[^a-z0-9]', '', header)
    return header


def parse_excel_rows(uploaded_file):
    workbook = openpyxl.load_workbook(uploaded_file, data_only=True)
    sheet = workbook.active
    rows = list(sheet.iter_rows(values_only=True))
    if not rows:
        return [], ['Le fichier Excel est vide.']

    headers = [normalize_header(cell) for cell in rows[0]]
    parsed = []

    for row_index, row in enumerate(rows[1:], start=2):
        if not any(row):
            continue
        entry = {}
        for header, cell in zip(headers, row):
            if cell is None:
                continue
            entry[header] = str(cell).strip()
        parsed.append((row_index, entry))

    return parsed, []


def find_enseignant(identifier):
    if identifier is None:
        return None
    identifier = str(identifier).strip()
    return Enseignant.objects.filter(
        Q(matricule=identifier) | Q(cin=identifier) | Q(email__iexact=identifier)
    ).first()


def find_etudiant(identifier):
    if identifier is None:
        return None
    identifier = str(identifier).strip()
    if identifier.isdigit():
        record = Etudiant.objects.filter(idEtudiant=int(identifier)).first()
        if record:
            return record
    return Etudiant.objects.filter(
        Q(cin=identifier) | Q(email__iexact=identifier)
    ).first()


def find_jury(identifier):
    if identifier is None:
        return None
    identifier = str(identifier).strip()
    if identifier.isdigit():
        jury = Jury.objects.filter(idJury=int(identifier)).first()
        if jury:
            return jury
    return Jury.objects.filter(titre__iexact=identifier).first()


class JuryViewSet(viewsets.ModelViewSet):
    queryset = Jury.objects.all().prefetch_related('enseignants')
    serializer_class = JurySerializer
    parser_classes = [MultiPartParser, FormParser]

    @action(detail=False, methods=['post'], url_path='import-excel')
    def import_excel(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'detail': 'Aucun fichier envoyé.'}, status=status.HTTP_400_BAD_REQUEST)

        rows, errors = parse_excel_rows(file)
        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        validated = []
        for row_number, row_data in rows:
            titre = row_data.get('titre') or row_data.get('nom') or row_data.get('jury')
            if not titre:
                errors.append(f'Ligne {row_number} : le nom du jury est requis.')
                continue

            enseignants_values = [
                row_data.get('enseignant1') or row_data.get('matricule1') or row_data.get('m1'),
                row_data.get('enseignant2') or row_data.get('matricule2') or row_data.get('m2'),
                row_data.get('enseignant3') or row_data.get('matricule3') or row_data.get('m3'),
            ]
            enseignants_values = [value for value in enseignants_values if value]
            if len(enseignants_values) < 2 or len(enseignants_values) > 3:
                errors.append(f'Ligne {row_number} : un jury doit contenir 2 ou 3 enseignants.')
                continue

            enseignants = []
            for raw_value in enseignants_values:
                teacher = find_enseignant(raw_value)
                if teacher is None:
                    errors.append(
                        f"Ligne {row_number} : encadrant/jury non trouvé pour '{raw_value}'."
                    )
                else:
                    enseignants.append(teacher)

            if errors:
                continue

            validated.append({'titre': titre, 'enseignants': enseignants})

        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        created = []
        with transaction.atomic():
            for payload in validated:
                jury = Jury.objects.create(titre=payload['titre'])
                jury.enseignants.set(payload['enseignants'])
                created.append(JurySerializer(jury).data)

        return Response({'created': created}, status=status.HTTP_201_CREATED)


class PFEViewSet(viewsets.ModelViewSet):
    queryset = PFE.objects.all().select_related('encadrant', 'jury').prefetch_related('etudiants')
    serializer_class = PFESerializer
    parser_classes = [MultiPartParser, FormParser]

    @action(detail=False, methods=['post'], url_path='import-excel')
    def import_excel(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'detail': 'Aucun fichier envoyé.'}, status=status.HTTP_400_BAD_REQUEST)

        rows, errors = parse_excel_rows(file)
        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        created = []
        validated = []

        for row_number, row_data in rows:
            sujet = row_data.get('sujet')
            duree = row_data.get('duree')
            specialite = row_data.get('specialite') or row_data.get('specialité')
            encadrant_value = row_data.get('encadrant') or row_data.get('matriculeencadrant')
            jury_value = row_data.get('jury')
            etudiant_values = [
                row_data.get('etudiant1'),
                row_data.get('etudiant2'),
                row_data.get('idetudiant1'),
                row_data.get('idetudiant2'),
                row_data.get('cin1'),
                row_data.get('cin2'),
            ]
            etudiant_values = [v for v in etudiant_values if v]

            if not sujet or not duree or not specialite or not encadrant_value or not jury_value:
                errors.append(
                    f'Ligne {row_number} : sujet, durée, spécialité, encadrant et jury sont requis.'
                )
                continue

            if len(etudiant_values) < 1 or len(etudiant_values) > 2:
                errors.append(
                    f'Ligne {row_number} : un PFE doit contenir 1 ou 2 étudiants.'
                )
                continue

            encadrant = find_enseignant(encadrant_value)
            if encadrant is None:
                errors.append(f"Ligne {row_number} : encadrant '{encadrant_value}' introuvable.")
                continue

            jury = find_jury(jury_value)
            if jury is None:
                errors.append(f"Ligne {row_number} : jury '{jury_value}' introuvable.")
                continue

            etudiants = []
            for raw_etudiant in etudiant_values:
                etudiant = find_etudiant(raw_etudiant)
                if etudiant is None:
                    errors.append(
                        f"Ligne {row_number} : étudiant '{raw_etudiant}' introuvable."
                    )
                else:
                    etudiants.append(etudiant)

            if errors:
                continue

            validated.append(
                {
                    'sujet': sujet,
                    'duree': duree,
                    'specialite': specialite,
                    'encadrant': encadrant.matricule,
                    'jury': jury.idJury,
                    'etudiants': [etudiant.idEtudiant for etudiant in etudiants],
                }
            )

        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            for payload in validated:
                serializer = PFESerializer(data=payload)
                serializer.is_valid(raise_exception=True)
                pfe = serializer.save()
                created.append(serializer.data)

        return Response({'created': created}, status=status.HTTP_201_CREATED)
