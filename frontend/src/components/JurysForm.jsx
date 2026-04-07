import React, { useState, useEffect } from 'react';

function JurysForm({ selected, enseignants, onSubmit, onCancel }) {
  const [titre, setTitre] = useState('');
  const [selectedEnseignants, setSelectedEnseignants] = useState([]);

  useEffect(() => {
    if (selected) {
      setTitre(selected.titre || '');
      setSelectedEnseignants(
        Array.isArray(selected.enseignants)
          ? selected.enseignants
          : Array.isArray(selected.enseignants_detail)
            ? selected.enseignants_detail.map((e) => e.matricule)
            : []
      );
    }
  }, [selected]);

  const handleTeacherToggle = (matricule) => {
    const next = selectedEnseignants.includes(matricule)
      ? selectedEnseignants.filter((item) => item !== matricule)
      : [...selectedEnseignants, matricule];
    setSelectedEnseignants(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titre.trim()) {
      return alert('Le titre du jury est requis.');
    }
    if (selectedEnseignants.length < 2 || selectedEnseignants.length > 3) {
      return alert('Le jury doit contenir 2 ou 3 enseignants.');
    }
    onSubmit({
      idJury: selected?.idJury,
      titre: titre.trim(),
      enseignants: selectedEnseignants,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{selected ? 'Modifier un jury' : 'Ajouter un jury'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Titre</label>
            <input value={titre} onChange={(e) => setTitre(e.target.value)} required />
          </div>
          <div className="form-row">
            <label>Enseignants</label>
            <div className="checkbox-grid">
              {enseignants.map((enseignant) => (
                <label key={enseignant.matricule} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={enseignant.matricule}
                    checked={selectedEnseignants.includes(enseignant.matricule)}
                    onChange={() => handleTeacherToggle(enseignant.matricule)}
                  />
                  {enseignant.nom} {enseignant.prenom}
                </label>
              ))}
            </div>
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

export default JurysForm;
