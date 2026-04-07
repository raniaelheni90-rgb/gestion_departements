
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PFEsTable from '../components/PFEsTable';
import PFEForm from '../components/PFEForm';
import EncadrantsTable from '../components/EncadrantsTable';
import JurysTable from '../components/JurysTable';
import EncadrantsForm from '../components/EncadrantsForm';
import JurysForm from '../components/JurysForm';
import './GestionEtudiants.css';

function GestionPFEs() {
  const [pfes, setPFEs] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [jurys, setJurys] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [selectedPFE, setSelectedPFE] = useState(null);
  const [selectedEncadrant, setSelectedEncadrant] = useState(null);
  const [selectedJury, setSelectedJury] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showEncadrantForm, setShowEncadrantForm] = useState(false);
  const [showJuryForm, setShowJuryForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('Tous les champs');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const pfeFileRef = useRef(null);
  const encadrantFileRef = useRef(null);
  const juryFileRef = useRef(null);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [pfeRes, enseignantRes, juryRes, etudiantRes] = await Promise.all([
        axios.get('/api/pfes/'),
        axios.get('/api/enseignants/'),
        axios.get('/api/jurys/'),
        axios.get('/api/etudiants/'),
      ]);
      setPFEs(Array.isArray(pfeRes.data) ? pfeRes.data : []);
      setEnseignants(Array.isArray(enseignantRes.data) ? enseignantRes.data : []);
      setJurys(Array.isArray(juryRes.data) ? juryRes.data : []);
      setEtudiants(Array.isArray(etudiantRes.data) ? etudiantRes.data : []);
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'Impossible de charger les données. Vérifiez que le backend est disponible.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const safePFEs = Array.isArray(pfes) ? pfes : [];
  const filteredPFEs = safePFEs.filter((item) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();

    switch (filterBy) {
      case 'ID PFE':
        return String(item?.idPfe || '').toLowerCase().includes(term);
      case 'Sujet':
        return String(item?.sujet || '').toLowerCase().includes(term);
      case 'Encadrant':
        return String(item?.encadrant_detail?.nom || '').toLowerCase().includes(term) ||
          String(item?.encadrant_detail?.prenom || '').toLowerCase().includes(term);
      case 'Jury':
        return String(item?.jury_detail?.titre || '').toLowerCase().includes(term);
      default:
        return (
          String(item?.idPfe || '').toLowerCase().includes(term) ||
          String(item?.sujet || '').toLowerCase().includes(term) ||
          String(item?.specialite || '').toLowerCase().includes(term) ||
          String(item?.encadrant_detail?.nom || '').toLowerCase().includes(term) ||
          String(item?.encadrant_detail?.prenom || '').toLowerCase().includes(term) ||
          String(item?.jury_detail?.titre || '').toLowerCase().includes(term)
        );
    }
  });

  const handleOpenForm = (pfe = null) => {
    setSelectedPFE(pfe);
    setShowForm(true);
    setError('');
    setMessage('');
  };

  const handleCloseForm = () => {
    setSelectedPFE(null);
    setShowForm(false);
  };

  const handleSavePFE = async (data) => {
    try {
      const payload = {
        sujet: data.sujet,
        duree: data.duree,
        specialite: data.specialite,
        encadrant: data.encadrant,
        jury: data.jury,
        etudiants: data.etudiants,
      };

      if (data.idPfe) {
        await axios.put(`/api/pfes/${data.idPfe}/`, payload);
        setMessage('PFE modifié avec succès.');
      } else {
        await axios.post('/api/pfes/', payload);
        setMessage('PFE créé avec succès.');
      }

      handleCloseForm();
      loadData();
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.errors || 'Erreur lors de l’enregistrement.');
    }
  };

  const handleDeletePFE = async (idPfe) => {
    if (!window.confirm('Supprimer ce PFE ?')) return;
    try {
      await axios.delete(`/api/pfes/${idPfe}/`);
      setMessage('PFE supprimé avec succès.');
      setPFEs((prev) => prev.filter((item) => item.idPfe !== idPfe));
    } catch (err) {
      setError('Impossible de supprimer le PFE.');
    }
  };

  const handleOpenEncadrantForm = (enseignant = null) => {
    setSelectedEncadrant(enseignant);
    setShowEncadrantForm(true);
    setError('');
    setMessage('');
  };

  const handleCloseEncadrantForm = () => {
    setSelectedEncadrant(null);
    setShowEncadrantForm(false);
  };

  const handleSaveEncadrant = async (data) => {
    try {
      const path = selectedEncadrant ? selectedEncadrant.matricule : data.matricule;
      if (selectedEncadrant) {
        await axios.put(`/api/enseignants/${path}/`, data);
        setMessage('Encadrant modifié avec succès.');
      } else {
        await axios.post('/api/enseignants/', data);
        setMessage('Encadrant ajouté avec succès.');
      }
      handleCloseEncadrantForm();
      loadData();
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.errors || 'Erreur lors de l’enregistrement.');
    }
  };

  const handleDeleteEncadrant = async (matricule) => {
    if (!window.confirm('Supprimer cet encadrant ?')) return;
    try {
      await axios.delete(`/api/enseignants/${matricule}/`);
      setMessage('Encadrant supprimé avec succès.');
      loadData();
    } catch (err) {
      setError('Impossible de supprimer l’encadrant.');
    }
  };

  const handleImportEncadrants = () => {
    encadrantFileRef.current?.click();
  };

  const handleEncadrantFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/enseignants/import-excel/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(`Import réussi : ${response.data.created.length} encadrant(s) ajoutés.`);
      setError('');
      loadData();
    } catch (err) {
      setError(err.response?.data?.errors || err.response?.data?.detail || 'Erreur d’import encadrants.');
    } finally {
      event.target.value = null;
    }
  };

  const handleOpenJuryForm = (jury = null) => {
    setSelectedJury(jury);
    setShowJuryForm(true);
    setError('');
    setMessage('');
  };

  const handleCloseJuryForm = () => {
    setSelectedJury(null);
    setShowJuryForm(false);
  };

  const handleSaveJury = async (data) => {
    try {
      if (data.idJury) {
        await axios.put(`/api/jurys/${data.idJury}/`, {
          titre: data.titre,
          enseignants: data.enseignants,
        });
        setMessage('Jury modifié avec succès.');
      } else {
        await axios.post('/api/jurys/', {
          titre: data.titre,
          enseignants: data.enseignants,
        });
        setMessage('Jury ajouté avec succès.');
      }
      handleCloseJuryForm();
      loadData();
    } catch (err) {
      setError(err.response?.data?.detail || err.response?.data?.errors || 'Erreur lors de l’enregistrement.');
    }
  };

  const handleDeleteJury = async (idJury) => {
    if (!window.confirm('Supprimer ce jury ?')) return;
    try {
      await axios.delete(`/api/jurys/${idJury}/`);
      setMessage('Jury supprimé avec succès.');
      loadData();
    } catch (err) {
      setError('Impossible de supprimer le jury.');
    }
  };

  const handleImportJurys = () => {
    juryFileRef.current?.click();
  };

  const handleJuryFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/jurys/import-excel/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(`Import réussi : ${response.data.created.length} jury(s) ajoutés.`);
      setError('');
      loadData();
    } catch (err) {
      setError(err.response?.data?.errors || err.response?.data?.detail || 'Erreur d’import jury.');
    } finally {
      event.target.value = null;
    }
  };

  const handleImportExcel = () => {
    pfeFileRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/pfes/import-excel/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(`Import réussi : ${response.data.created.length} PFE(s) ajoutés.`);
      setError('');
      loadData();
    } catch (err) {
      setError(err.response?.data?.errors || err.response?.data?.detail || 'Erreur d’import Excel.');
    } finally {
      event.target.value = null;
    }
  };

  return (
    <div className="main-container">
      <h2 className="page-title">Gestion des PFE</h2>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="success-message" style={{ background: '#e53e3e' }}>{JSON.stringify(error)}</div>}

      <div className="page-container">
        <div className="search-area">
          <select className="filter-select" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
            <option>Tous les champs</option>
            <option>ID PFE</option>
            <option>Sujet</option>
            <option>Encadrant</option>
            <option>Jury</option>
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
          <button className="btn" type="button" onClick={() => handleOpenForm(null)}>
            Ajouter un PFE
          </button>
          <button className="btn import-btn" type="button" onClick={handleImportExcel}>
            Importer PFE
          </button>
          <input type="file" accept=".xlsx,.xls" ref={pfeFileRef} onChange={handleFileChange} style={{ display: 'none' }} />
        </div>
      </div>

      {loading ? (
        <div className="table-card">Chargement en cours...</div>
      ) : (
        <>
          <div className="table-card">
            <div className="card-header">
              <h3>PFE</h3>
              <div className="button-group">
                <button className="btn" type="button" onClick={() => handleOpenForm(null)}>
                  Ajouter un PFE
                </button>
                <button className="btn import-btn" type="button" onClick={handleImportExcel}>
                  Importer PFE
                </button>
              </div>
            </div>
            <PFEsTable
              pfes={filteredPFEs}
              onEdit={handleOpenForm}
              onDelete={handleDeletePFE}
            />
          </div>

          <div className="table-card">
            <div className="card-header">
              <h3>Encadrants</h3>
              <div className="button-group">
                <button className="btn" type="button" onClick={() => handleOpenEncadrantForm(null)}>
                  Ajouter
                </button>
                <button className="btn import-btn" type="button" onClick={handleImportEncadrants}>
                  Importer
                </button>
              </div>
            </div>
            <EncadrantsTable
              enseignants={enseignants}
              onEdit={handleOpenEncadrantForm}
              onDelete={handleDeleteEncadrant}
            />
          </div>

          <div className="table-card">
            <div className="card-header">
              <h3>Jurys</h3>
              <div className="button-group">
                <button className="btn" type="button" onClick={() => handleOpenJuryForm(null)}>
                  Ajouter
                </button>
                <button className="btn import-btn" type="button" onClick={handleImportJurys}>
                  Importer
                </button>
              </div>
            </div>
            <JurysTable
              jurys={jurys}
              onEdit={handleOpenJuryForm}
              onDelete={handleDeleteJury}
            />
          </div>

          <input type="file" accept=".xlsx,.xls" ref={encadrantFileRef} onChange={handleEncadrantFileChange} style={{ display: 'none' }} />
          <input type="file" accept=".xlsx,.xls" ref={juryFileRef} onChange={handleJuryFileChange} style={{ display: 'none' }} />
        </>
      )}

      {showForm && (
        <PFEForm
          pfe={selectedPFE}
          enseignants={enseignants}
          jurys={jurys}
          etudiants={etudiants}
          onCancel={handleCloseForm}
          onSubmit={handleSavePFE}
        />
      )}

      {showEncadrantForm && (
        <EncadrantsForm
          selected={selectedEncadrant}
          onCancel={handleCloseEncadrantForm}
          onSubmit={handleSaveEncadrant}
        />
      )}

      {showJuryForm && (
        <JurysForm
          selected={selectedJury}
          enseignants={enseignants}
          onCancel={handleCloseJuryForm}
          onSubmit={handleSaveJury}
        />
      )}
    </div>
  );
}

export default GestionPFEs;
