import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SoutenancesTable from '../components/SoutenancesTable';
import SoutenanceForm from '../components/SoutenanceForm';
import './GestionSoutenances.css';

function GestionSoutenances() {
  const [soutenances, setSoutenances] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [pfes, setPFEs] = useState([]);
  const [selectedSoutenance, setSelectedSoutenance] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('Tous les champs');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const fileRef = useRef(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [soutenanceRes, enseignantRes, etudiantRes, pfeRes] = await Promise.all([
        axios.get('/api/soutenances/'),
        axios.get('/api/enseignants/'),
        axios.get('/api/etudiants/'),
        axios.get('/api/pfes/')
      ]);

      setSoutenances(Array.isArray(soutenanceRes.data) ? soutenanceRes.data : (soutenanceRes.data?.results || []));
      setEnseignants(Array.isArray(enseignantRes.data) ? enseignantRes.data : (enseignantRes.data?.results || []));
      setEtudiants(Array.isArray(etudiantRes.data) ? etudiantRes.data : (etudiantRes.data?.results || []));
      setPFEs(Array.isArray(pfeRes.data) ? pfeRes.data : (pfeRes.data?.results || []));
      setError('');
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'Impossible de charger les données.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredSoutenances = soutenances.filter((s) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    switch (filterBy) {
      case "ID Soutenance":
        return String(s?.idSoutenance || '').toLowerCase().includes(term);
      case "Date":
        return String(s?.date_soutenance || '').toLowerCase().includes(term);
      case "Heure":
        return String(s?.heure_soutenance || '').toLowerCase().includes(term);
      case "Salle":
        return String(s?.salle || '').toLowerCase().includes(term);
      case "Encadrant":
        return String(s?.encadrant_detail?.nom || '').toLowerCase().includes(term) ||
          String(s?.encadrant_detail?.prenom || '').toLowerCase().includes(term);
      case "Type contrat (enc.)":
        return String(s?.encadrant_detail?.typeContrat || '').toLowerCase().includes(term);
      case "Rapporteur":
        return String(s?.rapporteur_detail?.nom || '').toLowerCase().includes(term) ||
          String(s?.rapporteur_detail?.prenom || '').toLowerCase().includes(term);
      case "Type contrat (rap.)":
        return String(s?.rapporteur_detail?.typeContrat || '').toLowerCase().includes(term);
      default:
        return (
          String(s?.idSoutenance || '').toLowerCase().includes(term) ||
          String(s?.date_soutenance || '').toLowerCase().includes(term) ||
          String(s?.heure_soutenance || '').toLowerCase().includes(term) ||
          String(s?.salle || '').toLowerCase().includes(term) ||
          String(s?.encadrant_detail?.nom || '').toLowerCase().includes(term) ||
          String(s?.encadrant_detail?.prenom || '').toLowerCase().includes(term) ||
          String(s?.encadrant_detail?.typeContrat || '').toLowerCase().includes(term) ||
          String(s?.rapporteur_detail?.nom || '').toLowerCase().includes(term) ||
          String(s?.rapporteur_detail?.prenom || '').toLowerCase().includes(term) ||
          String(s?.rapporteur_detail?.typeContrat || '').toLowerCase().includes(term)
        );
    }
  });

  const handleOpenForm = (soutenance = null) => {
    setSelectedSoutenance(soutenance);
    setShowForm(true);
    setError('');
    setMessage('');
  };

  const handleCloseForm = () => {
    setSelectedSoutenance(null);
    setShowForm(false);
  };

  const handleSaveSoutenance = async (data) => {
    try {
      if (selectedSoutenance) {
        await axios.put(`/api/soutenances/${selectedSoutenance.idSoutenance}/`, data);
        setMessage('Soutenance modifiée avec succès.');
      } else {
        await axios.post('/api/soutenances/', data);
        setMessage('Soutenance ajoutée avec succès.');
      }
      handleCloseForm();
      loadData();
    } catch (err) {
      const d = err.response?.data;
      let msg = "Erreur lors de l'enregistrement.";
      if (typeof d === 'string') msg = d;
      else if (d?.detail) msg = typeof d.detail === 'string' ? d.detail : JSON.stringify(d.detail);
      else if (d && typeof d === 'object') {
        msg = Object.entries(d)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(' ') : v}`)
          .join(' · ');
      }
      setError(msg);
    }
  };

  const handleDeleteSoutenance = async (idSoutenance) => {
    if (!window.confirm('Supprimer cette soutenance ?')) return;
    try {
      await axios.delete(`/api/soutenances/${idSoutenance}/`);
      setMessage('Soutenance supprimée avec succès.');
      loadData();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'enregistrement de la soutenance.");
    }
  };

  const handleImportClick = () => {
    fileRef.current.click();
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      let importedData = [];
      const text = reader.result;

      if (file.name.toLowerCase().endsWith('.json')) {
        try {
          importedData = JSON.parse(text);
        } catch (e) {
          console.error(e);
          return alert('Impossible de lire le fichier JSON.');
        }
      } else {
        const rows = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        if (rows.length < 2) return alert('Fichier CSV vide ou invalide.');
        const headers = rows[0].split(',').map(h => h.trim().toLowerCase());

        importedData = rows.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((acc, header, index) => {
            acc[header] = values[index]?.trim() ?? '';
            return acc;
          }, {});
        });
      }

      if (!Array.isArray(importedData) || !importedData.length) {
        return alert('Aucune donnée importable trouvée.');
      }

      try {
        setLoading(true);
        let successCount = 0;
        for (const record of importedData) {
          try {
            if (record.etudiants && typeof record.etudiants === 'string') {
              record.etudiants = record.etudiants.split(';').map(id => Number(id.trim())).filter(id => !isNaN(id));
            }
            await axios.post('/api/soutenances/', record);
            successCount++;
          } catch (err) {
            console.error("Erreur lors de l'import:", err);
          }
        }
        setMessage(`${successCount} soutenance(s) importée(s) avec succès.`);
        await loadData();
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la génération du PV.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="main-container soutenances-page-container">
      <h2 className="page-title">Gestion des Soutenances</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="success-message" style={{ background: '#e53e3e' }}>{error}</div>}

      {loading ? (
        <div className="table-card">Chargement en cours...</div>
      ) : (
        <>
          <div className="page-container">
            <div className="search-area">
              <select
                className="filter-select"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option>Tous les champs</option>
                <option>ID Soutenance</option>
                <option>Date</option>
                <option>Heure</option>
                <option>Salle</option>
                <option>Encadrant</option>
                <option>Type contrat (enc.)</option>
                <option>Rapporteur</option>
                <option>Type contrat (rap.)</option>
              </select>

              <input
                type="text"
                placeholder="Rechercher..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="buttons-area">
              <button
                className="btn import-btn"
                onClick={handleImportClick}
              >
                Importer fichier
              </button>
              <button
                className="btn"
                onClick={() => handleOpenForm(null)}
              >
                Nouvelle soutenance
              </button>
            </div>
          </div>

          <input
            type="file"
            accept=".csv,.json"
            ref={fileRef}
            style={{ display: 'none' }}
            onChange={handleImport}
          />

          <SoutenancesTable
            soutenances={filteredSoutenances}
            onEdit={handleOpenForm}
            onDelete={handleDeleteSoutenance}
          />
        </>
      )}

      {showForm && (
        <SoutenanceForm
          soutenance={selectedSoutenance}
          soutenances={soutenances}
          enseignants={enseignants}
          etudiants={etudiants}
          pfes={pfes}
          onCancel={handleCloseForm}
          onSubmit={handleSaveSoutenance}
        />
      )}
    </div>
  );
}

export default GestionSoutenances;