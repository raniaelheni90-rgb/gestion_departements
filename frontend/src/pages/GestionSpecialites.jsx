import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GestionEtudiants.css';

const GestionSpecialites = () => {
  const [specialites, setSpecialites] = useState([]);
  const [filteredSpecialites, setFilteredSpecialites] = useState([]);
  const [licences, setLicences] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('Nom');
  const [showForm, setShowForm] = useState(false);
  const [selectedSpecialite, setSelectedSpecialite] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchSpecialites = async () => {
    try {
      const response = await axios.get('/api/specialites/');
      setSpecialites(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des spécialités:', error);
      setError('Erreur lors du chargement des spécialités: ' + (error.response?.data?.detail || error.message));
    }
  };

  const fetchLicences = async () => {
    try {
      const response = await axios.get('/api/licences/');
      setLicences(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des licences:', error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSpecialites();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLicences();
  }, []);

  const handleAdd = async (formData) => {
    try {
      if (selectedSpecialite) {
        await axios.put(`/api/specialites/${selectedSpecialite.id}/`, formData);
        setMessage('Spécialité mise à jour avec succès !');
        setError('');
      } else {
        await axios.post('/api/specialites/', formData);
        setMessage('Spécialité ajoutée avec succès !');
        setError('');
      }
      fetchSpecialites();
      setShowForm(false);
      setSelectedSpecialite(null);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      setError('Erreur lors de l\'enregistrement : ' + (error.response?.data?.error || error.message));
      setMessage('');
    }
  };

  const handleEdit = (spec) => {
    setSelectedSpecialite(spec);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette spécialité ?')) {
      try {
        await axios.delete(`/api/specialites/${id}/`);
        setMessage('Spécialité supprimée avec succès !');
        setError('');
        fetchSpecialites();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        setError('Erreur lors de la suppression : ' + (error.response?.data?.error || error.message));
        setMessage('');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedSpecialite(null);
  };

  return (
    <div className="gestion-container">
      <h2>Gestion des Spécialités</h2>

      <div className="controls-section">
        <div className="search-area">
          <div className="filter-group">
            <label>Filtrer par:</label>
            <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
              <option value="Nom">Nom</option>
              <option value="Code">Code</option>
              <option value="Licence">Licence</option>
              <option value="Département">Département</option>
            </select>
          </div>
          <input
            type="text"
            placeholder={`Rechercher par ${filterBy.toLowerCase()}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <button
          className="btn btn-add"
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) setSelectedSpecialite(null);
          }}
        >
          {showForm ? 'Annuler' : '+ Nouvelle Spécialité'}
        </button>
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-container">
          <SpecialiteForm
            onSubmit={handleAdd}
            selectedSpecialite={selectedSpecialite}
            onCancel={handleCancel}
            licences={licences}
          />
        </div>
      )}

      <div className="table-container">
        <SpecialiteTable
          specialites={filteredSpecialites}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default GestionSpecialites;