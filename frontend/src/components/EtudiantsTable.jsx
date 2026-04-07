import React from "react";
import "./Table.css";
function EtudiantsTable({ etudiants, onEdit, onDelete }) {
  return (
<table className="table"> 
<thead>

<tr>
<th>🆔ID</th>
<th>🪪CIN</th>
<th>🛂 Passport</th>
<th>🌍 Nationalité</th>
<th>👤Nom</th>
<th>👤Prénom</th>
<th>📧Email</th>
<th>📞Téléphone</th>
<th>🎂Naissance</th>
<th>🏠Adresse</th>
<th>📅Inscription</th>
<th>⚙️Actions</th>
</tr>

</thead>
      <tbody>
        {etudiants.map((e) => (
          <tr key={e.idEtudiant}>
            <td>{e.idEtudiant ?? '-'}</td>
            <td>{e.cin || '-'}</td>
            <td>{e.passport || '-'}</td>
            <td>{e.nationalite || '-'}</td>
            <td>{e.nom || '-'}</td>
            <td>{e.prenom || '-'}</td>
            <td>{e.email || '-'}</td>
            <td>{e.numTel || '-'}</td>
            <td>{e.dateNaissance || '-'}</td>
            <td>{e.adresse || '-'}</td>
            <td>{e.dateInscription || '-'}</td>

            <td>

  <span
    className="icon edit-icon"
    onClick={() => onEdit(e)}
  >
    ✏️
  </span>

  <span
    className="icon delete-icon"
    onClick={() => onDelete(e.idEtudiant)}
  >
    🗑️
  </span>

</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EtudiantsTable;