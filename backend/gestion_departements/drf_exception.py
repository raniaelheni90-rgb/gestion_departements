"""Gestionnaire d'exceptions DRF."""

from rest_framework.views import exception_handler


def drf_db_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        return response
    return None
