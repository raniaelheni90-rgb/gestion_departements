import React, { useState } from 'react';
import './ModuleForm.css';

const ModuleForm = ({ onSubmit, selectedModule, onCancel, specialites }) => {
  const [formData, setFormData] = useState({
    nom: selectedModule?.nom || '',
    coefficient_ue: selectedModule?.coefficient_ue || 1,
    credit_ue: selectedModule?.credit_ue || 0,
    semestre: selectedModule?.semestre || 'S1',
    annee: selectedModule?.annee || 'L1',
    specialite: selectedModule?.specialite || '',
    licence: selectedModule?.licence || '',
    description: selectedModule?.description || '',
    matieres: selectedModule?.matieres && selectedModule.matieres.length > 0 
      ? selectedModule.matieres 
      : [{ nom: '', type: 'cours', volume_horaire: 0, vh_td: 0, vh_tp: 0, vh_ci: 0, coefficient: 1, credit: 0 }]
  });

  const [errors, setErrors] = useState({});

  const typeChoices = [
    { value: 'cours', label: 'Cours seulement' },
    { value: 'td', label: 'TD seulement' },
    { value: 'tp', label: 'TP seulement' },
    { value: 'cours_td', label: 'Cours et TD' },
    { value: 'cours_tp', label: 'Cours et TP' },
    { value: 'cours_td_tp', label: 'Cours, TD et TP' },
  ];

  const semestreChoices = [
    { value: 'S1', label: 'Semestre 1' },
    { value: 'S2', label: 'Semestre 2' },
    { value: 'S3', label: 'Semestre 3' },
    { value: 'S4', label: 'Semestre 4' },
    { value: 'S5', label: 'Semestre 5' },
    { value: 'S6', label: 'Semestre 6' },
  ];

  const anneeChoices = [
    { value: 'L1', label: 'Licence 1' },
    { value: 'L2', label: 'Licence 2' },
    { value: 'L3', label: 'Licence 3' },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.specialite) newErrors.specialite = 'La spécialité est requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isNumberField = ['coefficient_ue', 'credit_ue'].includes(name);
    setFormData(prev => ({
      ...prev,
      [name]: isNumberField ? parseFloat(value) || 0 : value
    }));
  };

  const handleMatiereChange = (index, e) => {
    const { name, value } = e.target;
    const isNumberField = ['volume_horaire', 'vh_td', 'vh_tp', 'vh_ci', 'coefficient', 'credit'].includes(name);
    const newMatieres = [...formData.matieres];
    newMatieres[index][name] = isNumberField ? parseFloat(value) || 0 : value;
    setFormData(prev => ({ ...prev, matieres: newMatieres }));
  };

  const addMatiere = () => {
    setFormData(prev => ({
      ...prev,
      matieres: [...prev.matieres, { nom: '', type: 'cours', volume_horaire: 0, vh_td: 0, vh_tp: 0, vh_ci: 0, coefficient: 1, credit: 0 }]
    }));
  };

  const removeMatiere = (index) => {
    setFormData(prev => ({
      ...prev,
      matieres: prev.matieres.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const specialiteObj = specialites.find(spec => String(spec.id) === String(formData.specialite));
      const moduleData = {
        ...formData,
        id: selectedModule?.id,
        licence: specialiteObj ? specialiteObj.licence : formData.licence,
      };
      onSubmit(moduleData);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      coefficient_ue: 1,
      credit_ue: 0,
      semestre: 'S1',
      annee: 'L1',
      specialite: '',
      licence: '',
      description: '',
      matieres: [{ nom: '', type: 'cours', volume_horaire: 0, vh_td: 0, vh_tp: 0, vh_ci: 0, coefficient: 1, credit: 0 }]
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="module-form">
      <div className="form-row">
        <div className="form-group" style={{ flex: '1 1 100%' }}>
          <label>Nom de l'UE *</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className={errors.nom ? 'input-error' : ''}
          />
          {errors.nom && <span className="error">{errors.nom}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Spécialité *</label>
          <select
            name="specialite"
            value={formData.specialite}
            onChange={handleChange}
            className={errors.specialite ? 'input-error' : ''}
          >
            <option value="">Sélectionner une spécialité</option>
            {specialites.map(spec => (
              <option key={spec.id} value={spec.id}>
                {spec.nom} ({spec.licence_nom} - {spec.departement_nom})
              </option>
            ))}
          </select>
          {errors.specialite && <span className="error">{errors.specialite}</span>}
        </div>

      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Année *</label>
          <select
            name="annee"
            value={formData.annee}
            onChange={handleChange}
          >
            {anneeChoices.map(choice => (
              <option key={choice.value} value={choice.value}>{choice.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Semestre *</label>
          <select
            name="semestre"
            value={formData.semestre}
            onChange={handleChange}
          >
            {semestreChoices.map(choice => (
              <option key={choice.value} value={choice.value}>{choice.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Coefficient Total UE</label>
          <input
            type="number"
            name="coefficient_ue"
            value={formData.coefficient_ue}
            onChange={handleChange}
            step="0.01"
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Crédits Total UE</label>
          <input
            type="number"
            name="credit_ue"
            value={formData.credit_ue}
            onChange={handleChange}
            step="0.01"
            min="0"
          />
        </div>
      </div>

      <div className="matieres-section" style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '20px' }}>
        <h3>Matières (Éléments Constitutifs)</h3>
        {formData.matieres.map((mat, index) => (
          <div key={index} className="matiere-block" style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '15px', position: 'relative' }}>
            {formData.matieres.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeMatiere(index)}
                style={{ position: 'absolute', top: '10px', right: '10px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '5px 10px' }}
              >
                X
              </button>
            )}
            <div className="form-row">
              <div className="form-group" style={{ flex: '2' }}>
                <label>Nom de la matière</label>
                <input
                  type="text"
                  name="nom"
                  value={mat.nom}
                  onChange={(e) => handleMatiereChange(index, e)}
                />
              </div>
              <div className="form-group" style={{ flex: '1' }}>
                <label>Type d'enseignement</label>
                <select
                  name="type"
                  value={mat.type || 'cours'}
                  onChange={(e) => handleMatiereChange(index, e)}
                >
                  {typeChoices.map(choice => (
                    <option key={choice.value} value={choice.value}>{choice.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Vol. H (Cours)</label>
                <input
                  type="number"
                  name="volume_horaire"
                  value={mat.volume_horaire}
                  onChange={(e) => handleMatiereChange(index, e)}
                  min="0"
                  step="0.5"
                />
              </div>
              <div className="form-group">
                <label>Vol. H (TD)</label>
                <input
                  type="number"
                  name="vh_td"
                  value={mat.vh_td}
                  onChange={(e) => handleMatiereChange(index, e)}
                  min="0"
                  step="0.5"
                />
              </div>
              <div className="form-group">
                <label>Vol. H (TP)</label>
                <input
                  type="number"
                  name="vh_tp"
                  value={mat.vh_tp || ''}
                  onChange={(e) => handleMatiereChange(index, e)}
                  min="0"
                  step="0.5"
                />
              </div>
              <div className="form-group">
                <label>Vol. H (CI)</label>
                <input
                  type="number"
                  name="vh_ci"
                  value={mat.vh_ci}
                  onChange={(e) => handleMatiereChange(index, e)}
                  min="0"
                  step="0.5"
                />
              </div>
              <div className="form-group">
                <label>Coefficient</label>
                <input
                  type="number"
                  name="coefficient"
                  value={mat.coefficient}
                  onChange={(e) => handleMatiereChange(index, e)}
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Crédits</label>
                <input
                  type="number"
                  name="credit"
                  value={mat.credit}
                  onChange={(e) => handleMatiereChange(index, e)}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>
        ))}
        <button 
          type="button" 
          onClick={addMatiere}
          style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
        >
          + Ajouter une matière
        </button>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-submit">
          {selectedModule ? 'Mettre à jour' : 'Ajouter'}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
};

export default ModuleForm;
