import React from "react";
import "./EtudiantsTable.css";
function EtudiantsTable({ etudiants, onEdit, onDelete }) {
  return (
     <table className="tableContainer"> 
      <thead   >
        <tr>
          <th>ID</th>
          <th>CIN</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>numTel</th>
          <th>dateNaissance</th>
          <th>adresse</th>
          <th>dateInscription</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {etudiants.map((e) => (
          <tr key={e.idEtudiant}>
            <td>{e.idEtudiant}</td>
            <td>{e.cin}</td>
            <td>{e.nom}</td>
            <td>{e.prenom}</td>
            <td>{e.email}</td>
            <td>{e.numTel}</td>
            <td>{e.dateNaissance}</td>
            <td>{e.adresse}</td>
            <td>{e.dateInscription}</td>

            <td>
              <button className="btn"   onClick={() => onEdit(e)}>Modifier</button>

              <button  className="btn delete"  onClick={() => onDelete(e.idEtudiant)}>
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EtudiantsTable;