import React from 'react';
import './Table.css';

const SpecialiteTable = ({ specialites, onEdit, onDelete }) => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Code</th>
            <th>Licence</th>
            <th>Département</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {specialites.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                Aucune spécialité trouvée
              </td>
            </tr>
          ) : (
            specialites.map((specialite) => (
              <tr key={specialite.id}>
                <td>{specialite.nom}</td>
                <td>{specialite.code}</td>
                <td>{specialite.licence_nom}</td>
                <td>{specialite.departement_nom}</td>
                <td>
                  {specialite.description ?
                    (specialite.description.length > 50 ?
                      `${specialite.description.substring(0, 50)}...` :
                      specialite.description
                    ) :
                    '-'
                  }
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(specialite)}
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(specialite.id)}
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SpecialiteTable;