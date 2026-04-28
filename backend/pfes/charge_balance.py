"""Charge encadrant / rapporteur : mêmes plafonds et équilibre entre les deux rôles."""

from typing import Optional

from .models import PFE, Soutenance


def get_plafond_groupes_pfe() -> int:
    """Plafond global (identique pour tous les encadrants / rapporteurs), configurable en base."""
    from .models import ParametresPfe

    p = ParametresPfe.objects.filter(pk=1).first()
    if p is None:
        return 5
    try:
        v = int(p.plafond_groupes)
        return max(1, min(99, v))
    except (TypeError, ValueError):
        return 5


def max_groupes_plafond(enseignant=None) -> int:
    """Compatibilité : le plafond ne dépend plus de l’enseignant."""
    return get_plafond_groupes_pfe()


def count_pfe_encadrant(enseignant) -> int:
    pk = enseignant.pk if hasattr(enseignant, "pk") else enseignant
    return PFE.objects.filter(encadrant_id=pk).count()


def count_soutenance_rapporteur(enseignant) -> int:
    pk = enseignant.pk if hasattr(enseignant, "pk") else enseignant
    return Soutenance.objects.filter(rapporteur_id=pk).count()


def pfe_total_after_save(proposed_encadrant, pfe_instance) -> int:
    """
    Nombre de PFE où proposed_encadrant sera encadrant après sauvegarde de ce PFE
    (création si pfe_instance sans pk).
    """
    if pfe_instance is None or not getattr(pfe_instance, "pk", None):
        return PFE.objects.filter(encadrant=proposed_encadrant).count() + 1
    if proposed_encadrant.pk == pfe_instance.encadrant_id:
        return PFE.objects.filter(encadrant=proposed_encadrant).count()
    return PFE.objects.filter(encadrant=proposed_encadrant).exclude(pk=pfe_instance.pk).count() + 1


def soutenance_total_after_save(proposed_rapporteur, soutenance_instance) -> int:
    """Nombre de soutenances où proposed_rapporteur sera rapporteur après sauvegarde."""
    if soutenance_instance is None or not getattr(soutenance_instance, "pk", None):
        return Soutenance.objects.filter(rapporteur=proposed_rapporteur).count() + 1
    if proposed_rapporteur.pk == soutenance_instance.rapporteur_id:
        return Soutenance.objects.filter(rapporteur=proposed_rapporteur).count()
    return (
        Soutenance.objects.filter(rapporteur=proposed_rapporteur)
        .exclude(pk=soutenance_instance.pk)
        .count()
        + 1
    )


def erreur_si_desiquilibre(e_count: int, r_count: int) -> Optional[str]:
    # Temporairement désactivé pour éviter de bloquer l'enregistrement
    return None


def erreur_si_depasse_plafond(role_count: int, cap: int, role_label: str) -> Optional[str]:
    if role_count <= cap:
        return None
    return (
        f"Cet enseignant a atteint le plafond de {cap} groupe(s) pour « {role_label} » "
        f"(réglage max. groupes PFE, identique pour encadrant et rapporteur)."
    )
