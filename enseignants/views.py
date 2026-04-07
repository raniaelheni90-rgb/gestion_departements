import re
from django.db import transaction
from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
import openpyxl

from .models import Enseignant
from .serializers import EnseignantSerializer


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


class EnseignantViewSet(viewsets.ModelViewSet):
    queryset = Enseignant.objects.all()
    serializer_class = EnseignantSerializer
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
        with transaction.atomic():
            for row_number, row_data in rows:
                payload = {
                    'matricule': row_data.get('matricule'),
                    'cin': row_data.get('cin'),
                    'nom': row_data.get('nom'),
                    'prenom': row_data.get('prenom'),
                    'email': row_data.get('email'),
                    'numtel': row_data.get('numtel') or row_data.get('telephone'),
                    'grade': row_data.get('grade'),
                    'daterecrutement': row_data.get('daterecrutement'),
                    'statutadministratif': row_data.get('statutadministratif') or row_data.get('statut'),
                }

                serializer = EnseignantSerializer(data=payload)
                if not serializer.is_valid():
                    errors.append({
                        'ligne': row_number,
                        'erreurs': serializer.errors,
                    })
                    continue

                matricule = serializer.validated_data.get('matricule')
                if Enseignant.objects.filter(
                    Q(matricule=matricule) |
                    Q(cin=serializer.validated_data.get('cin')) |
                    Q(email=serializer.validated_data.get('email'))
                ).exists():
                    errors.append(
                        f"Ligne {row_number} : l'enseignant existe déjà avec matricule/cin/email fourni."
                    )
                    continue

                enseignant = serializer.save()
                created.append(EnseignantSerializer(enseignant).data)

        if errors:
            return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'created': created}, status=status.HTTP_201_CREATED)
