import React from 'react';
import './Table.css';

function EncadrantsTable({ enseignants, onEdit, onDelete, encadrantAuPlafondPfe }) {
  const safeEnseignants = Array.isArray(enseignants) ? enseignants : [];

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Matricule</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Grade</th>
          <th>Type contrat</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {safeEnseignants.length === 0 ? (
          <tr>
            <td colSpan="8">Aucun encadrant disponible.</td>
          </tr>
        ) : (
          safeEnseignants.map((enseignant, index) => {
            const auPlafond =
              typeof encadrantAuPlafondPfe === 'function' && encadrantAuPlafondPfe(enseignant);
            return (
            <tr
              key={enseignant.matricule != null && String(enseignant.matricule) !== '' ? enseignant.matricule : `row-${index}`}
              title={auPlafond ? 'Plafond de groupes PFE atteint' : undefined}
              style={
                auPlafond
                  ? {
                      backgroundColor: '#e2e8f0',
                      color: '#475569',
                    }
                  : undefined
              }
            >
              <td>{enseignant.matricule}</td>
              <td>{enseignant.nom}</td>
              <td>{enseignant.prenom}</td>
              <td>{enseignant.email}</td>
              <td>{enseignant.numtel || ''}</td>
              <td>{enseignant.grade}</td>
              <td>{enseignant.typeContrat || '—'}</td>
              <td>
                <button className="action-button edit-icon" type="button" onClick={() => onEdit(enseignant)}>
                  Modifier
                </button>
                <button className="action-button delete-icon" type="button" onClick={() => onDelete(enseignant.matricule)}>
                  Supprimer
                </button>
              </td>
            </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default EncadrantsTable;
