import React, { useState, useEffect } from 'react';

function EncadrantsForm({ selected, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    matricule: '',
    cin: '',
    nom: '',
    prenom: '',
    email: '',
    numTel: '',
    grade: '',
    dateRecrutement: '',
    statutAdministratif: '',
  });

  useEffect(() => {
    if (selected) {
      setForm({
        matricule: selected.matricule || '',
        cin: selected.cin || '',
        nom: selected.nom || '',
        prenom: selected.prenom || '',
        email: selected.email || '',
        numTel: selected.numTel || selected.numtel || '',
        grade: selected.grade || '',
        dateRecrutement: selected.dateRecrutement || '',
        statutAdministratif: selected.statutAdministratif || '',
      });
    }
  }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.matricule || !form.nom || !form.prenom) {
      return alert('Matricule, nom et prénom sont obligatoires.');
    }
    onSubmit(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{selected ? 'Modifier un encadrant' : 'Ajouter un encadrant'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Matricule</label>
            <input name="matricule" value={form.matricule} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>CIN</label>
            <input name="cin" value={form.cin} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Nom</label>
            <input name="nom" value={form.nom} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Prénom</label>
            <input name="prenom" value={form.prenom} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Téléphone</label>
            <input name="numTel" value={form.numTel} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Grade</label>
            <input name="grade" value={form.grade} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Date de recrutement</label>
            <input type="date" name="dateRecrutement" value={form.dateRecrutement} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Statut administratif</label>
            <input name="statutAdministratif" value={form.statutAdministratif} onChange={handleChange} />
          </div>
          <div className="buttons-area">
            <button type="submit" className="btn">Enregistrer</button>
            <button type="button" className="btn import-btn" onClick={onCancel}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EncadrantsForm;
