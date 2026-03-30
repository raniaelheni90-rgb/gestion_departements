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

  useEffect(() => {

    if (selected) {

      setForm({ ...selected });

    }

  }, [selected]);


  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(form);

  };


  return (

    <form className="form-container" onSubmit={handleSubmit}>

      <h2 className="form-title">
        {selected ? "Modifier Étudiant" : "Nouvel Étudiant"}
      </h2>


      <div className="form-grid">

        <div className="input-group">
          <label>CIN</label>
          <input
            name="cin"
            value={form.cin}
            onChange={handleChange}
          />
        </div>


        <div className="input-group">
          <label>Nom</label>
          <input
            name="nom"
            value={form.nom}
            onChange={handleChange}
          />
        </div>


        <div className="input-group">
          <label>Prénom</label>
          <input
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
          />
        </div>


        <div className="input-group">
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>


        <div className="input-group">
          <label>Téléphone</label>
          <input
            name="numTel"
            value={form.numTel}
            onChange={handleChange}
          />
        </div>


        <div className="input-group">
          <label>Date naissance</label>
          <input
            type="date"
            name="dateNaissance"
            value={form.dateNaissance}
            onChange={handleChange}
          />
        </div>


        <div className="input-group">
          <label>Adresse</label>
          <input
            name="adresse"
            value={form.adresse}
            onChange={handleChange}
          />
        </div>


        <div className="input-group">
          <label>Date inscription</label>
          <input
            type="date"
            name="dateInscription"
            value={form.dateInscription}
            onChange={handleChange}
          />
        </div>

      </div>


      <div className="form-buttons">

        <button type="submit" className="btn save-btn">
          Enregistrer
        </button>

        <button
          type="button"
          className="btn cancel-btn"
          onClick={onCancel}
        >
          Annuler
        </button>

      </div>

    </form>

  );

}

export default EtudiantForm;