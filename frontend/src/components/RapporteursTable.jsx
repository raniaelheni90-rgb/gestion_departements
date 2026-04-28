import React from 'react';
import './Table.css';

function RapporteursTable({ rapporteurs, onEdit, onDelete }) {
  const safeRapporteurs = Array.isArray(rapporteurs) ? rapporteurs : [];

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
          <th style={{ whiteSpace: 'nowrap' }}>Groupes encadrés</th>
          <th style={{ whiteSpace: 'nowrap' }}>Soutenances rapporteur</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {safeRapporteurs.length === 0 ? (
          <tr>
            <td colSpan="10">Aucun rapporteur disponible.</td>
          </tr>
        ) : (
          safeRapporteurs.map((rapporteur) => {
            const nEnc = Number(rapporteur.nbGroupesEncadres);
            const nRap = Number(rapporteur.nbGroupesRapporteur);
            const encOk = Number.isFinite(nEnc) ? nEnc : 0;
            const rapOk = Number.isFinite(nRap) ? nRap : 0;
            const equilibre = encOk === rapOk;
            return (
            <tr
              key={rapporteur.matricule}
              title={
                equilibre
                  ? undefined
                  : 'À équilibrer : viser le même nombre de groupes encadrés et de soutenances comme rapporteur'
              }
              style={
                equilibre
                  ? undefined
                  : { backgroundColor: '#e2e8f0', color: '#475569' }
              }
            >
              <td>{rapporteur.matricule}</td>
              <td>{rapporteur.nom}</td>
              <td>{rapporteur.prenom}</td>
              <td>{rapporteur.email}</td>
              <td>{rapporteur.numtel || ''}</td>
              <td>{rapporteur.grade}</td>
              <td>{rapporteur.typeContrat || '—'}</td>
              <td style={{ fontWeight: 600, textAlign: 'center' }}>{encOk}</td>
              <td style={{ fontWeight: 600, textAlign: 'center' }}>{rapOk}</td>
              <td>
                {!rapporteur.syncedFromEnseignant ? (
                  <>
                    <button className="action-button edit-icon" type="button" onClick={() => onEdit(rapporteur)}>
                      Modifier
                    </button>
                    <button className="action-button delete-icon" type="button" onClick={() => onDelete(rapporteur.matricule)}>
                      Supprimer
                    </button>
                  </>
                ) : (
                  <span style={{ color: '#64748b', fontSize: '13px' }} title="Fiche enseignant : modifiez l’encadrant">
                    Liste dérivée
                  </span>
                )}
              </td>
            </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default RapporteursTable;
