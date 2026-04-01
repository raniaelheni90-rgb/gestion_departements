import React from "react";
import "./Table.css";

function DiplomesTable({ enseignants }) {
  return (
    <>
      <h3>Tableau des Diplômes</h3>
      <table className="table">
        <thead>
          <tr>
            <th>🆔 Matricule</th>
            <th>🎓 ID Diplôme</th>
            <th>📄 Libellé</th>
            <th>🧩 Spécialité</th>
            <th>📅 Date obtention</th>
          </tr>
        </thead>
        <tbody>
          {enseignants.map((e) => (
            <tr key={e.matricule}>
              <td>{e.matricule}</td>
              <td>{e.diplome?.idDiplome || "-"}</td>
              <td>{e.diplome?.libelleDiplome || "-"}</td>
              <td>{e.diplome?.specialite || "-"}</td>
              <td>{e.diplome?.dateObtention || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DiplomesTable;