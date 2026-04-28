import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gestion_departements.settings")
django.setup()

from django.core.mail import send_mail
from django.conf import settings

try:
    send_mail(
        'Test Email',
        'Ceci est un test.',
        settings.DEFAULT_FROM_EMAIL,
        ['test@gmail.com'],
        fail_silently=False,
    )
    print("Email envoyé avec succès !")
except Exception as e:
    print(f"Erreur d'envoi d'email : {e}")
