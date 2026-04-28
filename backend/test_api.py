import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gestion_departements.settings")
django.setup()

from pfes.models import PFE
from enseignants.models import Enseignant

pfe = PFE.objects.first()
ens = Enseignant.objects.last()

print(f"PFE {pfe.idPfe} - Old encadrant: {pfe.encadrant}")
pfe.encadrant = ens
pfe.save()
print(f"PFE {pfe.idPfe} - New encadrant: {pfe.encadrant}")

from pfes.views import send_pfe_assignment_email
send_pfe_assignment_email(pfe, ens)
print("Fonction d'envoi appelée manuellement.")
