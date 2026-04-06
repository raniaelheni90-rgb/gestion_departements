import React,{useState,useEffect} from "react";
import "./EnseignantForm.css";

function EnseignantForm({selected,onSubmit,onCancel}){

const [form,setForm]=useState({

matricule:"",
cin:"",
nom:"",
prenom:"",
email:"",
numTel:"",
dateRecrutement:"",
typeContrat:"",

dateTitularisation:"",
statutAdministratif:"",
anneeInscription:"",

nbHeures:"",
tauxHoraire:"",

dureeContrat:"",
dateDebut:"",
dateFin:"",
sujetThese:"",
universite:"",
primeRecherche:"",
numeroOrdre:"",

diplome:{

idDiplome:"",
libelleDiplome:"",
specialite:"",
universite:"",
dateObtention:""

}

});

// eslint-disable-next-line react-hooks/set-state-in-effect
useEffect(()=>{

if(selected)setForm(selected);

},[selected]);

const handleChange=(e)=>{

const{name,value}=e.target;

if(name.includes(".")){

const[parent,child]=name.split(".");

setForm({

...form,

[parent]:{

...form[parent],

[child]:value

}

});

}else{

setForm({...form,[name]:value});

}

};

const handleSubmit=(e)=>{

e.preventDefault();

if(!form.matricule||!form.nom){

alert("Matricule et nom obligatoires");

return;

}

onSubmit(form);

};

return(

<div className="modal">

<form className="form" onSubmit={handleSubmit}>

<h3>Formulaire Enseignant</h3>

<input name="matricule" placeholder="Matricule" value={form.matricule} onChange={handleChange}/>
<input name="cin" placeholder="CIN" value={form.cin} onChange={handleChange}/>
<input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange}/>
<input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange}/>
<input name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
<input name="numTel" placeholder="Téléphone" value={form.numTel} onChange={handleChange}/>
<input type="date" name="dateRecrutement" value={form.dateRecrutement} onChange={handleChange}/>

<label>Statut Administratif</label>
<select name="statutAdministratif" value={form.statutAdministratif} onChange={handleChange}>
  <option value="">Choisir</option>
  <option value="en exercice">En exercice</option>
  <option value="en détachement">En détachement</option>
  <option value="en congé étude">En congé étude</option>
</select>

<label>Type contrat</label>

<select name="typeContrat" value={form.typeContrat} onChange={handleChange}>

<option value="">Choisir</option>
<option value="Permanent">Permanent</option>
<option value="Vacataire">Vacataire</option>
<option value="ContratDoctorant">Contrat Doctorant</option>
<option value="ContratDocteur">Contrat Docteur</option>

</select>

{form.typeContrat==="Permanent"&&(

<>

<input name="dateTitularisation" placeholder="Date titularisation" onChange={handleChange}/>
<input name="anneeInscription" placeholder="Année inscription" onChange={handleChange}/>

</>

)}

{form.typeContrat==="Vacataire"&&(

<>

<input name="nbHeures" placeholder="Nb heures" onChange={handleChange}/>
<input name="tauxHoraire" placeholder="Taux horaire" onChange={handleChange}/>

</>

)}

{form.typeContrat==="ContratDoctorant"&&(

<>

<input name="dureeContrat" placeholder="Durée contrat" onChange={handleChange}/>
<input type="date" name="dateDebut" onChange={handleChange}/>
<input type="date" name="dateFin" onChange={handleChange}/>
<input name="sujetThese" placeholder="Sujet thèse" onChange={handleChange}/>
<input name="universite" placeholder="Université" onChange={handleChange}/>
<input name="anneeInscription" placeholder="Année inscription" onChange={handleChange}/>

</>

)}

{form.typeContrat==="ContratDocteur"&&(

<>

<input name="dureeContrat" placeholder="Durée contrat" onChange={handleChange}/>
<input type="date" name="dateDebut" onChange={handleChange}/>
<input type="date" name="dateFin" onChange={handleChange}/>
<input name="primeRecherche" placeholder="Prime recherche" onChange={handleChange}/>
<input name="numeroOrdre" placeholder="Numéro d'ordre" onChange={handleChange}/>

</>

)}

<h4>Diplôme</h4>

<input name="diplome.idDiplome" placeholder="ID diplôme" onChange={handleChange}/>
<input name="diplome.libelleDiplome" placeholder="Libellé diplôme" onChange={handleChange}/>
<input name="diplome.specialite" placeholder="Spécialité" onChange={handleChange}/>
<input name="diplome.universite" placeholder="Université" onChange={handleChange}/>
<input type="date" name="diplome.dateObtention" onChange={handleChange}/>

<div className="buttons">

<button type="submit">Valider</button>

<button type="button" onClick={onCancel}>Annuler</button>

</div>

</form>

</div>

);

}

export default EnseignantForm;