import React from 'react';
import './Table.css';

function formatHeureApi(h) {
  if (h == null || h === '') return '—';
  const s = String(h).trim();
  return s.length >= 5 ? s.slice(0, 5) : s;
}

function SoutenancesTable({ soutenances, onEdit, onDelete }) {
  const safeSoutenances = Array.isArray(soutenances) ? soutenances : [];

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Heure</th>
          <th>Durée (min)</th>
          <th>Salle</th>
          <th>Encadrant</th>
          <th>Type contrat (enc.)</th>
          <th>Rapporteur</th>
          <th>Type contrat (rap.)</th>
          <th>Étudiants</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {safeSoutenances.length === 0 ? (
          <tr>
            <td colSpan="11">Aucune soutenance disponible.</td>
          </tr>
        ) : (
          safeSoutenances.map((soutenance) => (
            <tr key={soutenance.idSoutenance}>
              <td>{soutenance.idSoutenance}</td>
              <td>{new Date(soutenance.date_soutenance).toLocaleDateString('fr-FR')}</td>
              <td>{formatHeureApi(soutenance.heure_soutenance)}</td>
              <td>{soutenance.duree}</td>
              <td>{soutenance.salle}</td>
              <td>
                {soutenance.encadrant_detail
                  ? `${soutenance.encadrant_detail.nom} ${soutenance.encadrant_detail.prenom}`
                  : soutenance.encadrant}
              </td>
              <td>{soutenance.encadrant_detail?.typeContrat || '—'}</td>
              <td>
                {soutenance.rapporteur_detail
                  ? `${soutenance.rapporteur_detail.nom} ${soutenance.rapporteur_detail.prenom}`
                  : soutenance.rapporteur}
              </td>
              <td>{soutenance.rapporteur_detail?.typeContrat || '—'}</td>
              <td>
                {soutenance.etudiants_detail && soutenance.etudiants_detail.length > 0
                  ? soutenance.etudiants_detail.map((e) => `${e.nom} ${e.prenom}`).join(', ')
                  : soutenance.etudiants.join(', ')}
              </td>
              <td>
                <button className="action-button edit-icon" type="button" onClick={() => onEdit(soutenance)}>
                  Modifier
                </button>
                <button className="action-button delete-icon" type="button" onClick={() => onDelete(soutenance.idSoutenance)}>
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

export default SoutenancesTable;
