import React, { useState, useEffect, useRef } from "react";
import EnseignantsTable from "../components/EnseignantsTable";
import EnseignantForm from "../components/EnseignantsForm";
import "./GestionEtudiants.css";

// Tableaux supplémentaires
import DiplomesTable from "../components/DiplomesEnseignant";
import ContratsTable from "../components/ContratsEnseignant";

// FAKE DATA
const fakeData = [
  {
    matricule: "ENS001",
    cin: "12345678",
    nom: "Khaled",
    prenom: "Ben Ali",
    email: "khaled@mail.com",
    grade: "Professeur",
    numTel: "98765432",
    dateRecrutement: "2020-09-01",
    typeContrat: "Permanent",
    dateTitularisation: "2021-01-01",
    statutAdministratif: "Actif",
    diplome: {
      idDiplome: "D001",
      libelleDiplome: "PhD",
      specialite: "Informatique",
      dateObtention: "2019-06-15"
    }
  },
  {
    matricule: "ENS002",
    cin: "87654321",
    nom: "Sana",
    prenom: "Ben Mohamed",
    email: "sana@mail.com",
    grade: "Maître-assistant",
    numTel: "98765433",
    dateRecrutement: "2021-02-15",
    typeContrat: "Vacataire",
    nbHeures: "20",
    tauxHoraire: "50",
    diplome: {
      idDiplome: "D002",
      libelleDiplome: "Master",
      specialite: "Mathématiques",
      dateObtention: "2018-05-20"
    }
  }
];

function GestionEnseignants() {
  const [enseignants, setEnseignants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("Tous les champs");
  const [successMessage, setSuccessMessage] = useState("");
  const fileRef = useRef(null);

  // Charger les données
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    const saved = localStorage.getItem("enseignants");
    if (saved) setEnseignants(JSON.parse(saved));
    else setEnseignants(fakeData);
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem("enseignants", JSON.stringify(enseignants));
  }, [enseignants]);

  const handleAddOrUpdate = (enseignant) => {
    if (selected) {
      setEnseignants(
        enseignants.map((e) =>
          e.matricule === enseignant.matricule ? enseignant : e
        )
      );
      setSuccessMessage("Enseignant modifié avec succès");
    } else {
      setEnseignants([...enseignants, enseignant]);
      setSuccessMessage("Enseignant ajouté avec succès");
    }
    setSelected(null);
    setShowForm(false);
    setTimeout(() => setSuccessMessage(""), 3000);
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

  const handleDelete = (matricule) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet enseignant ?")) return;
    setEnseignants(enseignants.filter((e) => e.matricule !== matricule));
    setSuccessMessage("Enseignant supprimé avec succès");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleImportClick = () => fileRef.current.click();
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      let importedData = [];
      const text = reader.result;

      if (file.name.toLowerCase().endsWith(".json")) {
        try {
          importedData = JSON.parse(text);
        } catch (error) {
          return alert("Impossible de lire le fichier JSON.");
        }
      } else {
        importedData = parseCsv(text);
      }

      if (!Array.isArray(importedData) || !importedData.length) {
        return alert("Aucune donnée importable trouvée.");
      }

      const cleanedData = importedData
        .map(cleanEnseignant)
        .filter((item) => item.matricule || item.nom || item.prenom);

      if (!cleanedData.length) {
        return alert("Aucune ligne valide trouvée après nettoyage.");
      }

      setEnseignants([...enseignants, ...cleanedData]);
      setSuccessMessage(`${cleanedData.length} enseignant(s) importé(s) et nettoyé(s)`);
      setTimeout(() => setSuccessMessage(""), 3000);
    };

    reader.readAsText(file);
  };

  // Filtrage
  const filteredEnseignants = enseignants.filter((e) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    switch (filterBy) {
      case "Nom":
        return e.nom.toLowerCase().includes(term);
      case "Email":
        return e.email.toLowerCase().includes(term);
      case "Grade":
        return e.grade.toLowerCase().includes(term);
      default:
        return (
          e.nom.toLowerCase().includes(term) ||
          e.email.toLowerCase().includes(term) ||
          e.grade.toLowerCase().includes(term) ||
          e.cin.toLowerCase().includes(term)
        );
    }
  });

  return (
    <>
      <h2 className="page-title">Gestion des enseignants</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="page-container">
        <div className="search-area">
          <select
            className="filter-select"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option>Tous les champs</option>
            <option>Nom</option>
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

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EnseignantForm
              selected={selected}
              onSubmit={handleAddOrUpdate}
              onCancel={() => {
                setSelected(null);
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Tableau principal */}
      <EnseignantsTable
        enseignants={filteredEnseignants}
        onEdit={(e) => {
          setSelected(e);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      {/* Tableau diplômes */}
      <DiplomesTable enseignants={filteredEnseignants} />

      {/* Tableau contrats */}
      <ContratsTable enseignants={filteredEnseignants} />
    </>
  );
}

export default GestionEnseignants;