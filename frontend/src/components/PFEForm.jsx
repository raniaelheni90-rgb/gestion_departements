import React, { useState, useEffect } from 'react';

function PFEForm({ pfe, enseignants, jurys, etudiants, onCancel, onSubmit }) {
  const [sujet, setSujet] = useState('');
  const [duree, setDuree] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [encadrant, setEncadrant] = useState('');
  const [jury, setJury] = useState('');
  const [selectedEtudiants, setSelectedEtudiants] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [studentSearch, setStudentSearch] = useState('');

  useEffect(() => {
    if (pfe) {
      setSujet(pfe.sujet || '');
      setDuree(pfe.duree || '');
      setSpecialite(pfe.specialite || '');
      setEncadrant(pfe.encadrant || '');
      setJury(pfe.jury || '');
      setSelectedEtudiants(
        Array.isArray(pfe.etudiants) ? pfe.etudiants.map((e) => e.idEtudiant || e) : []
      );
    }
  }, [pfe]);

  const handleSave = (event) => {
    event.preventDefault();

    if (!sujet.trim() || !duree || !specialite.trim() || !encadrant || !jury) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (selectedEtudiants.length < 1 || selectedEtudiants.length > 2) {
      setErrorMessage('Un PFE doit contenir 1 ou 2 étudiants.');
      return;
    }

    setErrorMessage('');

    onSubmit({
      sujet: sujet.trim(),
      duree: Number(duree),
      specialite: specialite.trim(),
      encadrant,
      jury,
      etudiants: selectedEtudiants,
      idPfe: pfe?.idPfe,
    });
  };

  const handleStudentChange = (event) => {
    const value = Number(event.target.value);
    const isSelected = selectedEtudiants.includes(value);
    let next = [];

    if (isSelected) {
      next = selectedEtudiants.filter((item) => item !== value);
    } else {
      next = [...selectedEtudiants, value];
    }

    if (next.length <= 2) {
      setSelectedEtudiants(next);
      setErrorMessage('');
    } else {
      setErrorMessage('Vous ne pouvez sélectionner que 2 étudiants maximum.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{pfe ? 'Modifier le PFE' : 'Ajouter un nouveau PFE'}</h3>
        {errorMessage && <div className="success-message" style={{ background: '#e53e3e' }}>{errorMessage}</div>}
        <form onSubmit={handleSave}>
          <div className="form-row">
            <label>Sujet</label>
            <textarea
              value={sujet}
              onChange={(e) => setSujet(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="form-row">
            <label>Durée</label>
            <input
              type="number"
              value={duree}
              min="1"
              onChange={(e) => setDuree(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label>Spécialité</label>
            <input
              type="text"
              value={specialite}
              onChange={(e) => setSpecialite(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label>Encadrant</label>
            <select value={encadrant} onChange={(e) => setEncadrant(e.target.value)} required>
              <option value="">Sélectionner un encadrant</option>
              {enseignants.map((enseignant) => (
                <option key={enseignant.matricule} value={enseignant.matricule}>
                  {enseignant.nom} {enseignant.prenom} ({enseignant.matricule})
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Jury</label>
            <select value={jury} onChange={(e) => setJury(e.target.value)} required>
              <option value="">Sélectionner un jury</option>
              {jurys.map((juryItem) => (
                <option key={juryItem.idJury} value={juryItem.idJury}>
                  {juryItem.titre} (Jury {juryItem.idJury})
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Étudiants *</label>
            <div style={{ marginBottom: '8px', fontSize: '13px', color: '#64748b' }}>
              Sélectionnez {selectedEtudiants.length === 0 ? '1 ou 2 étudiants' : selectedEtudiants.length === 1 ? '1 étudiant (Monôme)' : '2 étudiants (Binôme)'}
            </div>
            <input
              type="text"
              placeholder="Rechercher un étudiant (nom ou prénom)..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                marginBottom: '12px',
                border: '2px solid #e0e7ff',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: '#f8fafc',
                transition: 'all 0.3s'
              }}
            />
            <div className="checkbox-grid">
              {etudiants
                .filter((etudiant) => {
                  const searchLower = studentSearch.toLowerCase();
                  return (
                    etudiant.nom.toLowerCase().includes(searchLower) ||
                    etudiant.prenom.toLowerCase().includes(searchLower)
                  );
                })
                .map((etudiant) => (
                <label key={etudiant.idEtudiant} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={etudiant.idEtudiant}
                    checked={selectedEtudiants.includes(etudiant.idEtudiant)}
                    onChange={handleStudentChange}
                  />
                  {etudiant.nom} {etudiant.prenom}
                </label>
              ))}
            </div>
            <div className={`student-count ${selectedEtudiants.length >= 1 && selectedEtudiants.length <= 2 ? 'valid' : 'invalid'}`}>
              {selectedEtudiants.length === 0 && '❌ Veuillez sélectionner au moins 1 étudiant'}
              {selectedEtudiants.length === 1 && '✓ Monôme - 1 étudiant sélectionné'}
              {selectedEtudiants.length === 2 && '✓ Binôme - 2 étudiants sélectionnés'}
              {selectedEtudiants.length > 2 && '❌ Maximum 2 étudiants autorisés'}
            </div>
          </div>

          <div className="buttons-area">
            <button type="submit" className="btn">
              Enregistrer
            </button>
            <button type="button" className="btn import-btn" onClick={onCancel}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PFEForm;
