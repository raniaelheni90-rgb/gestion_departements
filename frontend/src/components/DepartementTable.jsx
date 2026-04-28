import React from 'react';
import './Table.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DepartementTable = ({ departements, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Code</th>
          <th>Responsable</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {departements && departements.length > 0 ? (
          departements.map(dept => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.nom}</td>
              <td>{dept.code}</td>
              <td>{dept.responsable || '-'}</td>
              <td>{dept.email || '-'}</td>
              <td>{dept.telephone || '-'}</td>
              <td className="actions">
                <button
                  className="btn-icon edit"
                  onClick={() => onEdit(dept)}
                  title="Modifier"
                >
                  <FaEdit />
                </button>
                <button
                  className="btn-icon delete"
                  onClick={() => {
                    if (window.confirm('Êtes-vous sûr?')) {
                      onDelete(dept.id);
                    }
                  }}
                  title="Supprimer"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="empty">Aucun département trouvé</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DepartementTable;
