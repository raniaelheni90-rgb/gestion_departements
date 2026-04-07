import React from 'react';
import './Table.css';

function JurysTable({ jurys, onEdit, onDelete }) {
  const safeJurys = Array.isArray(jurys) ? jurys : [];

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID Jury</th>
          <th>Titre</th>
          <th>Enseignants</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {safeJurys.length === 0 ? (
          <tr>
            <td colSpan="4">Aucun jury disponible.</td>
          </tr>
        ) : (
          safeJurys.map((jury) => (
            <tr key={jury.idJury}>
              <td>{jury.idJury}</td>
              <td>{jury.titre}</td>
              <td>{Array.isArray(jury.enseignants_detail) ? jury.enseignants_detail.map((e) => `${e.nom} ${e.prenom}`).join(' / ') : (jury.enseignants || []).join(' / ')}</td>
              <td>
                <button className="action-button edit-icon" type="button" onClick={() => onEdit(jury)}>
                  Modifier
                </button>
                <button className="action-button delete-icon" type="button" onClick={() => onDelete(jury.idJury)}>
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

export default JurysTable;
