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
    dateInscription: "",
    nationalite: "",
    passport: ""
  });

  const [successMessage, setSuccessMessage] = useState(""); // ← message succès

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {

    if (selected) {
  
      setForm({
        idEtudiant: selected.idEtudiant || "",
        cin: selected.cin || "",
        nom: selected.nom || "",
        prenom: selected.prenom || "",
        email: selected.email || "",
        numTel: selected.numTel || "",
        dateNaissance: selected.dateNaissance || "",
        adresse: selected.adresse || "",
        dateInscription: selected.dateInscription || "",
        nationalite: selected.nationalite || "",
        passport: selected.passport || ""
      });
  
    } else {
  
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
        nationalite: "",
        passport: ""
  
      });
  
    }
  
  }, [selected]);

  const normalizeSpaces = (value) =>
    typeof value === "string"
      ? value.trim().replace(/\s+/g, " ")
      : value;

  const cleanFormData = (data) => ({
    ...data,
    cin: String(data.cin || "").replace(/\D/g, ""),
    nom: normalizeSpaces(data.nom),
    prenom: normalizeSpaces(data.prenom),
    email: String(data.email || "").trim().toLowerCase(),
    numTel: String(data.numTel || "").replace(/\D/g, ""),
    adresse: normalizeSpaces(data.adresse),
    nationalite: normalizeSpaces(data.nationalite),
    passport: String(data.passport || "").trim(),
    dateNaissance: String(data.dateNaissance || "").trim(),
    dateInscription: String(data.dateInscription || "").trim()
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
  
  
    /*
    VALIDATION
    */

    const cleanedForm = cleanFormData(form);
    setForm(cleanedForm);
  
  
    if (!/^[0-9]{8}$/.test(cleanedForm.cin)) {
  
      alert("CIN doit contenir 8 chiffres");
  
      return;
  
    }
  
  
    if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(cleanedForm.nom)) {
  
      alert("Nom invalide");
  
      return;
  
    }
  
  
    if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(cleanedForm.prenom)) {
  
      alert("Prénom invalide");
  
      return;
  
    }
  
  
    if (!/^[0-9]{8}$/.test(cleanedForm.numTel)) {
  
      alert("Téléphone doit contenir 8 chiffres");
  
      return;
  
    }
  
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedForm.email)) {
  
      alert("Email invalide");
  
      return;
  
    }

    if (cleanedForm.nationalite && !/^[a-zA-ZÀ-ÿ\s-]+$/.test(cleanedForm.nationalite)) {
  
      alert("Nationalité invalide");
  
      return;
  
    }

    if (cleanedForm.passport && !/^(?=.*[0-9])[A-Za-z0-9-\s]+$/.test(cleanedForm.passport)) {
  
      alert("Passeport invalide : doit contenir au moins un chiffre");
  
      return;
  
    }
  
  
    onSubmit(cleanedForm);
  
  
    setSuccessMessage("Étudiant enregistré avec succès !");
  
  
    // Reset form after successful submission
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
      nationalite: "",
      passport: ""
    });
  
  
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
placeholder="-"
required
/>
        </div>

        <div className="input-group">
          <label>Nom</label>
          <input
name="nom"
value={form.nom}
onChange={handleChange}
placeholder="-"
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
placeholder="-"
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
placeholder="-"
required/>
        </div>

        <div className="input-group">
          <label>Date inscription</label>
          <input type="date" name="dateInscription" value={form.dateInscription} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Nationalité</label>
          <input
name="nationalite"
value={form.nationalite}
onChange={handleChange}
placeholder="-"
/>
        </div>

        <div className="input-group">
          <label>Passport</label>
          <input
name="passport"
value={form.passport}
onChange={handleChange}
placeholder="-"
/>
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