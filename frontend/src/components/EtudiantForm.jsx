import React, { useState, useEffect } from "react";

// form pour l ajout ou modifier
function EtudiantForm({ selected, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    idEtudiant: "",
    cin: "",
    nom: "",
    prenom: "",
    email: "",
    numTel: "",
    dateNaissance: "",
    adresse: "",
    dateInscription: ""
  });

  // remplir l form
  useEffect(() => {
    if (selected) {
      setForm({
        idEtudiant: "",
        cin: "",
        nom: "",
        prenom: "",
        email: "",
        numTel: "",
        dateNaissance: "",
        adresse: "",
        dateInscription: "",
        ...selected
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>{selected ? "Modifier Étudiant" : "Ajouter Étudiant"}</h3>
      {Object.keys(form).map((key) => (
        <div key={key} style={{ marginBottom: "5px" }}>
          <input
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button onClick={() => onSubmit(form)}>Enregistrer</button>
      <button onClick={onCancel} style={{ marginLeft: "10px" }}>Annuler</button>
    </div>
  );
}

export default EtudiantForm;