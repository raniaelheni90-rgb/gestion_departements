import React,{useState,useEffect} from "react";
import "./EnseignantForm.css";

function EnseignantForm({ selected, onSubmit, onCancel, onFormChange }) {
  const initialFormState = {
    matricule: "",
    cin: "",
    nom: "",
    prenom: "",
    email: "",
    numTel: "",
    grade: "",
    dateRecrutement: "",
    typeContrat: "",
    dateTitularisation: "",
    statutAdministratif: "",
    anneeInscription: "",
    nbHeures: "",
    tauxHoraire: "",
    dureeContrat: "",
    dateDebut: "",
    dateFin: "",
    sujetThese: "",
    universite: "",
    primeRecherche: "",
    numeroOrdre: "",
    diplome: {
      libelleDiplome: "",
      specialite: "",
      universite: "",
      dateObtention: ""
    }
  };

  const [form, setForm] = useState(initialFormState);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (selected) {
      // Mode modification : initialiser avec les données de selected
      const nextForm = {
        matricule: selected.matricule || "",
        cin: selected.cin || "",
        nom: selected.nom || "",
        prenom: selected.prenom || "",
        email: selected.email || "",
        numTel: selected.numTel || selected.numtel || "",
        grade: selected.grade || "",
        dateRecrutement: selected.dateRecrutement || "",
        typeContrat: selected.typeContrat || "",
        dateTitularisation: selected.dateTitularisation || "",
        statutAdministratif: selected.statutAdministratif || "",
        anneeInscription: selected.anneeInscription || "",
        nbHeures: selected.nbHeures || "",
        tauxHoraire: selected.tauxHoraire || "",
        dureeContrat: selected.dureeContrat || "",
        dateDebut: selected.dateDebut || "",
        dateFin: selected.dateFin || "",
        sujetThese: selected.sujetThese || "",
        universite: selected.universite || "",
        primeRecherche: selected.primeRecherche || "",
        numeroOrdre: selected.numeroOrdre || "",
        diplome: {
          libelleDiplome: selected.diplome?.libelleDiplome || "",
          specialite: selected.diplome?.specialite || "",
          universite: selected.diplome?.universite || "",
          dateObtention: selected.diplome?.dateObtention || ""
        }
      };
      
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(nextForm);
      if (onFormChange) {
        onFormChange(nextForm);
      }
    }
    // Pour un nouvel enseignant, ne rien faire ici - le formulaire reste avec initialFormState
  }, [selected, onFormChange]);

const handleChange = (e) => {
  const { name, value } = e.target;
  const updateForm = (prevForm) => {
    let nextForm;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      nextForm = {
        ...prevForm,
        [parent]: {
          ...prevForm[parent],
          [child]: value,
        },
      };
    } else {
      nextForm = {
        ...prevForm,
        [name]: value,
      };
    }

    // Auto-calcul de la date de fin
    if (name === "dateDebut" || name === "dureeContrat") {
      const duree = parseInt(nextForm.dureeContrat, 10);
      const debut = nextForm.dateDebut;
      
      if (!isNaN(duree) && duree > 0 && debut) {
        const dateObj = new Date(debut);
        if (!isNaN(dateObj.getTime())) {
          dateObj.setFullYear(dateObj.getFullYear() + duree);
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, "0");
          const day = String(dateObj.getDate()).padStart(2, "0");
          nextForm.dateFin = `${year}-${month}-${day}`;
        }
      }
    }

    return nextForm;
  };

  setForm((prevForm) => {
    const updatedForm = updateForm(prevForm);
    if (onFormChange) {
      onFormChange(updatedForm);
    }
    return updatedForm;
  });
};

const validateForm = () => {
    if (!form.matricule.trim()) return "Matricule obligatoire.";
    if (!form.cin.trim()) return "CIN obligatoire.";
    if (!/^\d{8}$/.test(form.cin.trim())) return "Le CIN doit contenir exactement 8 chiffres.";
    if (!form.nom.trim()) return "Nom obligatoire.";
    if (!form.prenom.trim()) return "Prénom obligatoire.";
    if (!form.email.trim()) return "Email obligatoire.";
    if (!form.email.trim().toLowerCase().endsWith("@gmail.com")) return "L'email doit se terminer par @gmail.com.";
    if (!form.numTel.trim()) return "Téléphone obligatoire.";
    if (!/^\d{8}$/.test(form.numTel.trim())) return "Le téléphone doit contenir exactement 8 chiffres.";
    if (!form.grade.trim()) return "Grade obligatoire.";
    if (!form.dateRecrutement.trim()) return "Date de recrutement obligatoire.";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      return "L'email n'est pas valide.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      setFormError("");
      await onSubmit(form);
    } catch (err) {
      console.error('Erreur lors de la soumission du formulaire:', err);
      setFormError("Impossible d'enregistrer l'enseignant.");
    }
  };

return(

<div className="modal">

<form className="form" onSubmit={handleSubmit}>

<h3>Formulaire Enseignant</h3>

{formError && <div className="form-error">{formError}</div>}

<input name="matricule" placeholder="Matricule" value={form.matricule} onChange={handleChange} disabled={!!selected}/>
<input name="cin" placeholder="CIN" value={form.cin} onChange={handleChange}/>
<input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange}/>
<input name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange}/>
<input name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
<input name="numTel" placeholder="Téléphone" value={form.numTel} onChange={handleChange}/>
<input name="grade" placeholder="Grade" value={form.grade} onChange={handleChange}/>
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

{form.typeContrat === "Permanent" && (
  <>
    <input
      type="date"
      name="dateTitularisation"
      placeholder="Date titularisation"
      value={form.dateTitularisation}
      onChange={handleChange}
    />
    <input
      name="anneeInscription"
      placeholder="Année inscription"
      value={form.anneeInscription}
      onChange={handleChange}
    />
  </>
)}

{form.typeContrat === "Vacataire" && (
  <>
    <input
      name="nbHeures"
      placeholder="Nb heures"
      value={form.nbHeures}
      onChange={handleChange}
    />
    <input
      name="tauxHoraire"
      placeholder="Taux horaire"
      value={form.tauxHoraire}
      onChange={handleChange}
    />
  </>
)}

{form.typeContrat === "ContratDoctorant" && (
  <>
    <input
      name="dureeContrat"
      placeholder="Durée contrat"
      value={form.dureeContrat}
      onChange={handleChange}
    />
    <input
      type="date"
      name="dateDebut"
      value={form.dateDebut}
      onChange={handleChange}
    />
    <input
      type="date"
      name="dateFin"
      value={form.dateFin}
      onChange={handleChange}
    />
    <input
      name="sujetThese"
      placeholder="Sujet thèse"
      value={form.sujetThese}
      onChange={handleChange}
    />
    <input
      name="universite"
      placeholder="Université"
      value={form.universite}
      onChange={handleChange}
    />
    <input
      name="anneeInscription"
      placeholder="Année inscription"
      value={form.anneeInscription}
      onChange={handleChange}
    />
  </>
)}

{form.typeContrat === "ContratDocteur" && (
  <>
    <input
      name="dureeContrat"
      placeholder="Durée contrat"
      value={form.dureeContrat}
      onChange={handleChange}
    />
    <input
      type="date"
      name="dateDebut"
      value={form.dateDebut}
      onChange={handleChange}
    />
    <input
      type="date"
      name="dateFin"
      value={form.dateFin}
      onChange={handleChange}
    />
    <input
      name="primeRecherche"
      placeholder="Prime recherche"
      value={form.primeRecherche}
      onChange={handleChange}
    />
    <input
      name="numeroOrdre"
      placeholder="Numéro d'ordre"
      value={form.numeroOrdre}
      onChange={handleChange}
    />
  </>
)}

<h4>Diplôme</h4>

<input
  name="diplome.libelleDiplome"
  placeholder="Libellé diplôme"
  value={form.diplome.libelleDiplome}
  onChange={handleChange}
/>
<input
  name="diplome.specialite"
  placeholder="Spécialité"
  value={form.diplome.specialite}
  onChange={handleChange}
/>
<input
  name="diplome.universite"
  placeholder="Université"
  value={form.diplome.universite}
  onChange={handleChange}
/>
<input
  type="date"
  name="diplome.dateObtention"
  value={form.diplome.dateObtention}
  onChange={handleChange}
/>

<div className="buttons">

<button type="submit">Valider</button>

<button type="button" onClick={onCancel}>Annuler</button>

</div>

</form>

</div>

);

}

export default EnseignantForm;