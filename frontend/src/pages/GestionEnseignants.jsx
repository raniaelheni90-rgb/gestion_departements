import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import EnseignantsTable from "../components/EnseignantsTable";
import EnseignantForm from "../components/EnseignantsForm";
import "./GestionEtudiants.css";

// Tableaux supplémentaires
import DiplomesEnseignant from "../components/DiplomesEnseignant";
import ContratsEnseignant from "../components/ContratsEnseignant";

function GestionEnseignants() {
  const [enseignants, setEnseignants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [currentForm, setCurrentForm] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("Tous les champs");

  const fileRef = useRef(null);

  // Charger les données depuis l'API
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/enseignants/');
      setEnseignants(Array.isArray(response.data) ? response.data : []);
      console.log('Loaded enseignants:', response.data);
      setErrorMessage('');
    } catch (err) {
      console.error('Erreur lors du chargement des enseignants:', err);
      setErrorMessage('Impossible de charger les enseignants');
      setEnseignants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createEmptyForm = () => ({
    matricule: "",
    cin: "",
    nom: "",
    prenom: "",
    email: "",
    numTel: "",
    grade: "",
    dateRecrutement: "",
    typeContrat: "",
    dateTitularisation: "",
    statutAdministratif: "",
    anneeInscription: "",
    nbHeures: "",
    tauxHoraire: "",
    dureeContrat: "",
    dateDebut: "",
    dateFin: "",
    sujetThese: "",
    universite: "",
    primeRecherche: "",
    numeroOrdre: "",
    diplome: {
      idDiplome: "",
      libelleDiplome: "",
      specialite: "",
      universite: "",
      dateObtention: ""
    }
  });

  const handleAddOrUpdate = async (enseignant) => {
    try {
      const payload = {
        matricule: enseignant.matricule,
        cin: enseignant.cin,
        nom: enseignant.nom,
        prenom: enseignant.prenom,
        email: enseignant.email,
        numtel: enseignant.numtel || enseignant.numTel,
        grade: enseignant.grade,
        dateRecrutement: enseignant.dateRecrutement,
        statutAdministratif: enseignant.statutAdministratif,
        // Inclure les données de diplôme et contrat
        diplome: enseignant.diplome,
        typeContrat: enseignant.typeContrat,
        dateDebut: enseignant.dateDebut,
        dateFin: enseignant.dateFin,
        dateTitularisation: enseignant.dateTitularisation,
        anneeInscription: enseignant.anneeInscription,
        nbHeures: enseignant.nbHeures,
        tauxHoraire: enseignant.tauxHoraire,
        dureeContrat: enseignant.dureeContrat,
        sujetThese: enseignant.sujetThese,
        universite: enseignant.universite,
        primeRecherche: enseignant.primeRecherche,
        numeroOrdre: enseignant.numeroOrdre,
      };

      console.log('Sending payload:', payload);

      let response;
      if (selected) {
        response = await axios.put(`/api/enseignants/${selected.matricule}/`, payload);
      } else {
        response = await axios.post('/api/enseignants/', payload);
      }

      console.log('Response data:', response.data);

      const successText = selected ? 'Enseignant modifié avec succès' : 'Enseignant ajouté avec succès';
      setSuccessMessage(successText);
      setErrorMessage('');
      setShowForm(false);
      setSelected(null);
      setCurrentForm(null);
      
      await loadData();
      
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      let errorMsg = 'Erreur lors de l\'enregistrement';
      const responseData = err?.response?.data;
      if (typeof responseData === 'string') {
        errorMsg = responseData;
      } else if (responseData?.detail) {
        errorMsg = typeof responseData.detail === 'string' ? responseData.detail : JSON.stringify(responseData.detail);
      } else if (responseData?.errors) {
        errorMsg = typeof responseData.errors === 'string' ? responseData.errors : JSON.stringify(responseData.errors);
      } else if (responseData && typeof responseData === 'object') {
        errorMsg = Object.entries(responseData)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(' ') : v}`)
          .join(' | ');
      } else if (err?.message) {
        errorMsg = err.message;
      }
      setErrorMessage(errorMsg);
    }
  };

  const normalizeSpaces = (value) =>
    typeof value === "string"
      ? value.trim().replace(/\s+/g, " ")
      : value;

  const cleanDigits = (value) =>
    String(value || "").replace(/\D/g, "");

  const cleanEmail = (value) =>
    String(value || "").trim().toLowerCase();

  const cleanEnseignant = (item) => ({
    matricule: normalizeSpaces(item.matricule),
    cin: cleanDigits(item.cin),
    nom: normalizeSpaces(item.nom),
    prenom: normalizeSpaces(item.prenom),
    email: cleanEmail(item.email),
    grade: normalizeSpaces(item.grade),
    numTel: cleanDigits(item.numTel),
    dateRecrutement: String(item.dateRecrutement || "").trim(),
    typeContrat: normalizeSpaces(item.typeContrat),
    dateTitularisation: String(item.dateTitularisation || "").trim(),
    statutAdministratif: normalizeSpaces(item.statutAdministratif),
    diplome: {
      idDiplome: normalizeSpaces(item.idDiplome),
      libelleDiplome: normalizeSpaces(item.libelleDiplome),
      specialite: normalizeSpaces(item.specialite),
      dateObtention: String(item.dateObtention || "").trim()
    }
  });

  const normalizeHeader = (header) =>
    String(header)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/[^a-z0-9 ]/g, "");

  const parseCsvLine = (line) => {
    const parts = [];
    const regex = /(?:"([^"]*(?:""[^"]*)*)"|([^",]*))(?:,|$)/g;
    let match;
    while ((match = regex.exec(line))) {
      let value = match[1] || match[2] || "";
      value = value.replace(/""/g, '"');
      parts.push(value.trim());
    }
    return parts;
  };

  const parseCsv = (text) => {
    const rows = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (rows.length < 2) return [];

    const rawHeaders = parseCsvLine(rows[0]);
    const headers = rawHeaders.map((field) => {
      const normalized = normalizeHeader(field);
      switch (normalized) {
        case "matricule":
          return "matricule";
        case "cin":
          return "cin";
        case "nom":
          return "nom";
        case "prenom":
          return "prenom";
        case "email":
          return "email";
        case "grade":
          return "grade";
        case "telephone":
        case "numtel":
        case "num tel":
          return "numTel";
        case "daterecrutement":
        case "date recrutement":
          return "dateRecrutement";
        case "typecontrat":
        case "type contrat":
          return "typeContrat";
        case "datetitularisation":
        case "date titularisation":
          return "dateTitularisation";
        case "statutadministratif":
        case "statut administratif":
          return "statutAdministratif";
        case "iddiplome":
        case "id diplome":
          return "idDiplome";
        case "libellediplome":
        case "libelle diplome":
          return "libelleDiplome";
        case "specialite":
          return "specialite";
        case "dateobtention":
        case "date obtention":
          return "dateObtention";
        default:
          return normalized;
      }
    });

    return rows.slice(1).map((line) => {
      const values = parseCsvLine(line);
      return headers.reduce((acc, header, index) => {
        acc[header] = values[index] ?? "";
        return acc;
      }, {});
    });
  };

  const handleDelete = async (matricule) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet enseignant ?")) return;
    try {
      await axios.delete(`/api/enseignants/${matricule}/`);
      setSuccessMessage("Enseignant supprimé avec succès");
      setErrorMessage('');
      loadData();
    } catch (err) {
      setErrorMessage('Impossible de supprimer l\'enseignant');
    }
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleImportClick = () => fileRef.current.click();

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      let importedData = [];
      const text = reader.result;

      if (file.name.toLowerCase().endsWith(".json")) {
        try {
          importedData = JSON.parse(text);
        } catch (error) {
          setErrorMessage("Impossible de lire le fichier JSON.");
          return;
        }
      } else {
        importedData = parseCsv(text);
      }

      if (!Array.isArray(importedData) || !importedData.length) {
        setErrorMessage("Aucune donnée importable trouvée.");
        return;
      }

      const cleanedData = importedData
        .map((item) => ({
          matricule: item.matricule,
          cin: item.cin,
          nom: item.nom,
          prenom: item.prenom,
          email: item.email,
          numtel: item.numTel || item.numtel,
          grade: item.grade,
          dateRecrutement: item.dateRecrutement,
          statutAdministratif: item.statutAdministratif,
        }))
        .filter((item) => item.matricule && item.nom && item.prenom);

      if (!cleanedData.length) {
        setErrorMessage("Aucune ligne valide trouvée après nettoyage.");
        return;
      }

      try {
        // Envoyer chaque enseignant à l'API
        for (const enseignant of cleanedData) {
          try {
            await axios.post('/api/enseignants/', enseignant);
          } catch (itemErr) {
            // Continuer même si une ligne échoue
            console.error(`Erreur pour ${enseignant.matricule}:`, itemErr);
          }
        }
        setSuccessMessage(`${cleanedData.length} enseignant(s) importé(s)`);
        setErrorMessage('');
        loadData();
      } catch (err) {
        setErrorMessage('Erreur lors de l\'import');
      }
    };

    reader.readAsText(file);
  };

  // Filtrage
  const filteredEnseignants = enseignants.filter((e) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    
    const searchInField = (fieldValue) => 
      String(fieldValue || "").toLowerCase().includes(term);
    
    switch (filterBy) {
      case "Matricule":
        return searchInField(e.matricule);
      case "CIN":
        return searchInField(e.cin);
      case "Nom":
        return searchInField(e.nom);
      case "Prénom":
        return searchInField(e.prenom);
      case "Email":
        return searchInField(e.email);
      case "Grade":
        return searchInField(e.grade);
      default:
        return (
          searchInField(e.matricule) ||
          searchInField(e.cin) ||
          searchInField(e.nom) ||
          searchInField(e.prenom) ||
          searchInField(e.email) ||
          searchInField(e.grade)
        );
    }
  });

  return (
    <>
      <h2 className="page-title">Gestion des enseignants</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="success-message" style={{ background: '#e53e3e' }}>{errorMessage}</div>}

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
                <option>Matricule</option>
                <option>CIN</option>
                <option>Nom</option>
                <option>Prénom</option>
                <option>Email</option>
                <option>Grade</option>
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
              <button onClick={handleImportClick} className="btn import-btn">
                Importer fichier
              </button>
              <button
                className="btn"
                onClick={() => {
                  setSelected(null);
                  setCurrentForm(createEmptyForm());
                  setShowForm(true);
                }}
              >
                Nouvel enseignant
              </button>
            </div>
          </div>

          <input
            type="file"
            accept=".csv,.json"
            ref={fileRef}
            style={{ display: "none" }}
            onChange={handleImport}
          />

          {/* Tableau principal */}
          <EnseignantsTable
            enseignants={filteredEnseignants}
            onEdit={(e) => {
              setSelected(e);
              // Initialiser currentForm avec les données de l'enseignant, en s'assurant que diplome et autres champs existent
              setCurrentForm({
                ...e,
                diplome: e.diplome || {
                  idDiplome: "",
                  libelleDiplome: "",
                  specialite: "",
                  universite: "",
                  dateObtention: ""
                },
                // Assurer que tous les champs de contrat existent
                typeContrat: e.typeContrat || "",
                dateTitularisation: e.dateTitularisation || "",
                anneeInscription: e.anneeInscription || "",
                nbHeures: e.nbHeures || "",
                tauxHoraire: e.tauxHoraire || "",
                dureeContrat: e.dureeContrat || "",
                dateDebut: e.dateDebut || "",
                dateFin: e.dateFin || "",
                sujetThese: e.sujetThese || "",
                universite: e.universite || "",
                primeRecherche: e.primeRecherche || "",
                numeroOrdre: e.numeroOrdre || ""
              });
              setShowForm(true);
            }}
            onDelete={handleDelete}
          />

          <DiplomesEnseignant enseignants={filteredEnseignants} />
          <ContratsEnseignant enseignants={filteredEnseignants} />
        </>
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            {errorMessage && <div className="success-message" style={{ background: '#e53e3e', marginBottom: '15px' }}>{errorMessage}</div>}
            <EnseignantForm
              selected={selected}
              onSubmit={handleAddOrUpdate}
              onCancel={() => {
                setSelected(null);
                setCurrentForm(null);
                setShowForm(false);
                setErrorMessage("");
              }}
              onFormChange={setCurrentForm}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default GestionEnseignants;