from rest_framework import viewsets
from django.db.models import Q
from .models import Etudiant
from .serializers import EtudiantSerializer


class EtudiantViewSet(viewsets.ModelViewSet):
    queryset = Etudiant.objects.all()
    serializer_class = EtudiantSerializer

    def get_queryset(self):
        user = self.request.user
        if getattr(user, 'is_superuser', False):
            return Etudiant.objects.select_related('licence', 'specialite').all()
        
        enseignant = getattr(user, 'enseignant', None)
        if not enseignant:
            return Etudiant.objects.none()
            
        role = getattr(enseignant, 'role', '')
        departement = getattr(enseignant, 'departement', None)

        qs = Etudiant.objects.select_related('licence', 'specialite')
        
        if role == 'admin':
            return qs.all()
        elif role == 'chef_departement' and departement:
            return qs.filter(
                Q(licence__departement=departement) |
                Q(specialite__licence__departement=departement)
            ).distinct()
        
        return Etudiant.objects.none()
