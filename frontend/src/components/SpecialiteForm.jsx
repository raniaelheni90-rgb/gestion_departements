import React, { useState, useEffect } from 'react';
import './EnseignantForm.css';

const SpecialiteForm = ({ onSubmit, selectedSpecialite, onCancel, licences }) => {
  const [formData, setFormData] = useState({
    nom: '',
    code: '',
    description: '',
    licence: ''
  });

  useEffect(() => {
    if (selectedSpecialite) {
      setFormData({
        nom: selectedSpecialite.nom || '',
        code: selectedSpecialite.code || '',
        description: selectedSpecialite.description || '',
        licence: selectedSpecialite.licence || ''
      });
    } else {
      setFormData({
        nom: '',
        code: '',
        description: '',
        licence: ''
      });
    }
  }, [selectedSpecialite]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>{selectedSpecialite ? 'Modifier la Spécialité' : 'Ajouter une Spécialité'}</h3>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nom">Nom de la Spécialité *</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            placeholder="Ex: Comptabilité"
          />
        </div>

        <div className="form-group">
          <label htmlFor="code">Code *</label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            placeholder="Ex: COMP"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group full-width">
          <label htmlFor="licence">Licence *</label>
          <select
            id="licence"
            name="licence"
            value={formData.licence}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner une licence</option>
            {licences.map(licence => (
              <option key={licence.id} value={licence.id}>
                {licence.nom} ({licence.departement_nom})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Description de la spécialité..."
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {selectedSpecialite ? 'Modifier' : 'Ajouter'}
        </button>
        <button type="button" onClick={onCancel} className="btn-cancel">
          Annuler
        </button>
      </div>
    </form>
  );
};

export default SpecialiteForm;