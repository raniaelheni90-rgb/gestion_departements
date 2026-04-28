import React from 'react';
import './Table.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ModuleTable = ({ modules, onEdit, onDelete }) => {
  let commonHeader = null;
  if (modules && modules.length > 0) {
    const first = modules[0];
    const sameLicence = modules.every(m => m.licence_nom === first.licence_nom);
    const sameSpecialite = modules.every(m => m.specialite_nom === first.specialite_nom);
    const sameAnnee = modules.every(m => m.annee === first.annee);
    const sameSemestre = modules.every(m => m.semestre === first.semestre);
    
    if (sameLicence && sameAnnee && sameSemestre) {
      commonHeader = (
        <tr>
          <th colSpan="11" style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '15px', borderBottom: '2px solid #ddd' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.1em', marginBottom: '8px', color: '#333' }}>
              {first.licence_nom} ({first.annee} : {first.semestre})
            </div>
            {(sameSpecialite || first.specialite_nom) && (
              <div style={{ fontWeight: 'bold', fontSize: '1em', color: '#555' }}>
                {first.specialite_nom || "Tronc commun"}
              </div>
            )}
          </th>
        </tr>
      );
    }
  }

  return (
    <table className="table" style={{ tableLayout: 'fixed', width: '100%' }}>
      <colgroup>
        <col style={{ width: '20%' }} /> {/* UE */}
        <col style={{ width: '28%' }} /> {/* Elements */}
        <col style={{ width: '4%' }} />  {/* C */}
        <col style={{ width: '4%' }} />  {/* TD */}
        <col style={{ width: '4%' }} />  {/* TP */}
        <col style={{ width: '4%' }} />  {/* CI */}
        <col style={{ width: '6%' }} />  {/* Credit Elem */}
        <col style={{ width: '6%' }} />  {/* Credit Total */}
        <col style={{ width: '6%' }} />  {/* Coef Elem */}
        <col style={{ width: '6%' }} />  {/* Coef Total */}
        <col style={{ width: '12%' }} /> {/* Actions */}
      </colgroup>
      <thead>
        {commonHeader}
        <tr>
          <th rowSpan="2" style={{ verticalAlign: 'middle', textAlign: 'center' }}>Unité d'Enseignement UE</th>
          <th rowSpan="2" style={{ verticalAlign: 'middle', textAlign: 'center' }}>Eléments constitutifs de l'UE</th>
          <th colSpan="4" style={{ textAlign: 'center' }}>Volume horaire (14 semaines)</th>
          <th colSpan="2" style={{ textAlign: 'center' }}>Crédits</th>
          <th colSpan="2" style={{ textAlign: 'center' }}>Coefficient</th>
          <th rowSpan="2" style={{ verticalAlign: 'middle', textAlign: 'center' }}>Actions</th>
        </tr>
        <tr>
          <th style={{ textAlign: 'center' }}>C</th>
          <th style={{ textAlign: 'center' }}>TD</th>
          <th style={{ textAlign: 'center' }}>TP</th>
          <th style={{ textAlign: 'center' }}>CI</th>
          <th style={{ textAlign: 'center' }}>Par élément</th>
          <th style={{ textAlign: 'center' }}>Total UE</th>
          <th style={{ textAlign: 'center' }}>Par élément</th>
          <th style={{ textAlign: 'center' }}>Total UE</th>
        </tr>
      </thead>
      <tbody>
        {modules && modules.length > 0 ? (
          modules.map(mod => {
            const matieres = mod.matieres && mod.matieres.length > 0 ? mod.matieres : [{}];
            return matieres.map((mat, index) => (
              <tr key={`${mod.id}-${index}`}>
                {index === 0 && (
                  <td rowSpan={matieres.length} style={{ verticalAlign: 'middle', fontWeight: 'bold' }}>{mod.nom}</td>
                )}
                <td>{mat.nom || '-'}</td>
                <td style={{ textAlign: 'center' }}>{mat.volume_horaire > 0 ? `${mat.volume_horaire}H` : ''}</td>
                <td style={{ textAlign: 'center' }}>{mat.vh_td > 0 ? `${mat.vh_td}H` : ''}</td>
                <td style={{ textAlign: 'center' }}>{mat.vh_tp > 0 ? `${mat.vh_tp}H` : ''}</td>
                <td style={{ textAlign: 'center' }}>{mat.vh_ci > 0 ? `${mat.vh_ci}H` : ''}</td>
                <td style={{ textAlign: 'center' }}>{mat.credit > 0 ? mat.credit : ''}</td>
                
                {index === 0 && (
                  <td rowSpan={matieres.length} style={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 'bold' }}>
                    {mod.credit_ue > 0 ? mod.credit_ue : ''}
                  </td>
                )}
                
                <td style={{ textAlign: 'center' }}>{mat.coefficient > 0 ? mat.coefficient : ''}</td>
                
                {index === 0 && (
                  <td rowSpan={matieres.length} style={{ verticalAlign: 'middle', textAlign: 'center', fontWeight: 'bold' }}>
                    {mod.coefficient_ue > 0 ? mod.coefficient_ue : ''}
                  </td>
                )}
                
                {index === 0 && (
                  <td rowSpan={matieres.length} className="actions" style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                    <button
                      className="btn-icon edit"
                      onClick={() => onEdit(mod)}
                      title="Modifier"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-icon delete"
                      onClick={() => {
                        if (window.confirm('Êtes-vous sûr?')) {
                          onDelete(mod.id);
                        }
                      }}
                      title="Supprimer"
                    >
                      <FaTrash />
                    </button>
                  </td>
                )}
              </tr>
            ));
          })
        ) : (
          <tr>
            <td colSpan="10" className="empty">Aucun module trouvé</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ModuleTable;
