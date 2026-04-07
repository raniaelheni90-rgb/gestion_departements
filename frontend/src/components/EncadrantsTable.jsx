import React from 'react';
import './Table.css';

function EncadrantsTable({ enseignants, onEdit, onDelete }) {
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {safeEnseignants.length === 0 ? (
          <tr>
            <td colSpan="7">Aucun encadrant disponible.</td>
          </tr>
        ) : (
          safeEnseignants.map((enseignant) => (
            <tr key={enseignant.matricule}>
              <td>{enseignant.matricule}</td>
              <td>{enseignant.nom}</td>
              <td>{enseignant.prenom}</td>
              <td>{enseignant.email}</td>
              <td>{enseignant.numTel || enseignant.numtel}</td>
              <td>{enseignant.grade}</td>
              <td>
                <button className="action-button edit-icon" type="button" onClick={() => onEdit(enseignant)}>
                  Modifier
                </button>
                <button className="action-button delete-icon" type="button" onClick={() => onDelete(enseignant.matricule)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default EncadrantsTable;
