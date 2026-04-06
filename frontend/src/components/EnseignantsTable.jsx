import React from "react";
import "./Table.css";

function EnseignantsTable({ enseignants,onEdit,onDelete }) {

return(

<table className="table">

<thead>

<tr>
  <th>🆔 Matricule</th>
  <th>📝 CIN</th>
  <th>👤 Nom</th>
  <th>🧑‍🎓 Prénom</th>
  <th>📧 Email</th>
  <th>📱 Téléphone</th>
  <th>📅 Date recrutement</th>
  <th>📄 Type contrat</th>
  <th>�️ Statut Administratif</th>
  <th>�🎓 Diplôme</th>
  <th>⚙️ Actions</th>
</tr>

</thead>

<tbody>

{enseignants.map((e)=>(
<tr key={e.matricule}>

<td>{e.matricule}</td>
<td>{e.cin}</td>
<td>{e.nom}</td>
<td>{e.prenom}</td>
<td>{e.email}</td>
<td>{e.numTel}</td>
<td>{e.dateRecrutement}</td>
<td>{e.typeContrat}</td>
<td>{e.statutAdministratif}</td>
<td>{e.diplome?.libelleDiplome}</td>

<td>

<span

className="icon edit-icon"

onClick={()=>onEdit(e)}

>

✏️

</span>

<span

className="icon delete-icon"

onClick={()=>onDelete(e.matricule)}

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

export default EnseignantsTable;