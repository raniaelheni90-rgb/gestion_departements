import React from 'react';
import './Table.css';

function PFEsTable({ pfes, onEdit, onDelete }) {
  const safePFEs = Array.isArray(pfes) ? pfes : [];
  const renderStudents = (item) => {
    if (!Array.isArray(item?.etudiants_detail) || item.etudiants_detail.length === 0) {
      return '-';
    }
    return item.etudiants_detail.map((etudiant) => `${etudiant.nom} ${etudiant.prenom}`).join(' / ');
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID PFE</th>
          <th>Sujet</th>
          <th>Durée</th>
          <th>Spécialité</th>
          <th>Étudiants</th>
          <th>Encadrant</th>
          <th>Jury</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {safePFEs.map((pfe) => (
          <tr key={pfe?.idPfe ?? Math.random()}>
            <td>{pfe?.idPfe ?? '-'}</td>
            <td>{pfe?.sujet ?? '-'}</td>
            <td>{pfe?.duree ?? '-'}</td>
            <td>{pfe?.specialite ?? '-'}</td>
            <td>{renderStudents(pfe)}</td>
            <td>{pfe?.encadrant_detail ? `${pfe.encadrant_detail.nom} ${pfe.encadrant_detail.prenom}` : '-'}</td>
            <td>{pfe?.jury_detail ? pfe.jury_detail.titre : '-'}</td>
            <td>
              <button className="action-button edit-icon" type="button" onClick={() => onEdit(pfe)}>
                Modifier
              </button>
              <button className="action-button delete-icon" type="button" onClick={() => onDelete(pfe.idPfe)}>
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PFEsTable;
