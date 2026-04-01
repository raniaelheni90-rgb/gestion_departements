import React from "react";
import "./Table.css";

function ContratsTable({ enseignants }) {
  return (
    <>
      <h3>Tableau des Contrats</h3>
      <table className="table">
        <thead>
          <tr>
            <th>🆔 Matricule</th>
            <th>📄 Type Contrat</th>
            <th>📅 Date début</th>
            <th>📅 Date fin</th>
            <th>💼 Infos spécifiques</th>
          </tr>
        </thead>
        <tbody>
          {enseignants.map((e) => {
            let infoSpec = "";
            switch (e.typeContrat) {
              case "Permanent":
                infoSpec = `Date titularisation: ${e.dateTitularisation || "-"}, Statut: ${e.statutAdministratif || "-"}`;
                break;
              case "Vacataire":
                infoSpec = `Nb heures: ${e.nbHeures || "-"}, Taux horaire: ${e.tauxHoraire || "-"}`;
                break;
              case "ContratDoctorant":
                infoSpec = `Sujet thèse: ${e.sujetThese || "-"}, Université: ${e.universite || "-"}, Année: ${e.anneeThese || "-"}`;
                break;
              case "ContratDocteur":
                infoSpec = `Prime recherche: ${e.primeRecherche || "-"}, Durée: ${e.dureeContrat || "-"}`;
                break;
              default:
                infoSpec = "-";
            }
            return (
              <tr key={e.matricule}>
                <td>{e.matricule}</td>
                <td>{e.typeContrat}</td>
                <td>{e.dateDebut || "-"}</td>
                <td>{e.dateFin || "-"}</td>
                <td>{infoSpec}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ContratsTable;