import React, { useState } from 'react';
import './LicenceForm.css';

const LicenceForm = ({ onSubmit, selectedLicence, onCancel, departements }) => {
  const [formData, setFormData] = useState({
    nom: selectedLicence?.nom || '',
    code: selectedLicence?.code || '',
    description: selectedLicence?.description || '',
    duree: selectedLicence?.duree || '3 ans',
    departement: selectedLicence?.departement || '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.code.trim()) newErrors.code = 'Le code est requis';
    if (!formData.departement) newErrors.departement = 'Le département est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        id: selectedLicence?.id
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      code: '',
      description: '',
      duree: '3 ans',
      departement: '',
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="licence-form">
      <div className="form-group">
        <label>Nom de la Licence *</label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          className={errors.nom ? 'input-error' : ''}
        />
        {errors.nom && <span className="error">{errors.nom}</span>}
      </div>

      <div className="form-group">
        <label>Code *</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className={errors.code ? 'input-error' : ''}
        />
        {errors.code && <span className="error">{errors.code}</span>}
      </div>

      <div className="form-group">
        <label>Département *</label>
        <select
          name="departement"
          value={formData.departement}
          onChange={handleChange}
          className={errors.departement ? 'input-error' : ''}
        >
          <option value="">Sélectionner un département</option>
          {departements.map(dept => (
            <option key={dept.id} value={dept.id}>{dept.nom}</option>
          ))}
        </select>
        {errors.departement && <span className="error">{errors.departement}</span>}
      </div>

      <div className="form-group">
        <label>Durée</label>
        <input
          type="text"
          name="duree"
          value={formData.duree}
          onChange={handleChange}
          placeholder="ex: 3 ans"
        />
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
          {selectedLicence ? 'Mettre à jour' : 'Ajouter'}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </form>
  );
};

export default LicenceForm;
