import React, { useState, useEffect } from "react";
import "./EtudiantForm.css";

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

  const [successMessage, setSuccessMessage] = useState(""); // ← message succès

  useEffect(() => {

    if (selected) {
  
      setForm(selected);
  
    } else {
  
      setForm({
  
        cin: "",
        nom: "",
        prenom: "",
        email: "",
        numTel: "",
        dateNaissance: "",
        adresse: "",
        dateInscription: ""
  
      });
  
    }
  
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
  
  
    /*
    VALIDATION
    */
  
  
    if (!/^[0-9]{8}$/.test(form.cin)) {
  
      alert("CIN doit contenir 8 chiffres");
  
      return;
  
    }
  
  
    if (!/^[a-zA-Z]+$/.test(form.nom)) {
  
      alert("Nom invalide");
  
      return;
  
    }
  
  
    if (!/^[a-zA-Z]+$/.test(form.prenom)) {
  
      alert("Prénom invalide");
  
      return;
  
    }
  
  
    if (!/^[0-9]{8}$/.test(form.numTel)) {
  
      alert("Téléphone doit contenir 8 chiffres");
  
      return;
  
    }
  
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
  
      alert("Email invalide");
  
      return;
  
    }
  
  
    onSubmit(form);
  
  
    setSuccessMessage("Étudiant enregistré avec succès !");
  
  
    setTimeout(() =>
  
      setSuccessMessage("")
  
    , 3000);
  
  };
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {selected ? "Modifier Étudiant" : "Nouvel Étudiant"}
      </h2>

      {/* Message succès */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="form-grid">
        <div className="input-group">
          <label>CIN</label>
          <input
name="cin"
value={form.cin}
onChange={handleChange}
required
/>
        </div>

        <div className="input-group">
          <label>Nom</label>
          <input
name="nom"
value={form.nom}
onChange={handleChange}
required
/>
        </div>

        <div className="input-group">
          <label>Prénom</label>
          <input
name="prenom"
value={form.prenom}
onChange={handleChange}
required
/>
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
name="email"
value={form.email}
onChange={handleChange}
required
/>
        </div>

        <div className="input-group">
          <label>Téléphone</label>
          <input
name="numTel"
value={form.numTel}
onChange={handleChange}
required
/>
        </div>

        <div className="input-group">
          <label>Date naissance</label>
          <input type="date" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Adresse</label>
          <input
name="adresse"
value={form.adresse}
onChange={handleChange}
required/>
        </div>

        <div className="input-group">
          <label>Date inscription</label>
          <input type="date" name="dateInscription" value={form.dateInscription} onChange={handleChange} />
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn save-btn">Enregistrer</button>
        <button type="button" className="btn cancel-btn" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}

export default EtudiantForm;