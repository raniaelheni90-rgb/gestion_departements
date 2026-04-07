import React, { useState, useEffect, useRef } from "react";
import Layout from "../layout/Layout";
import EtudiantsTable from "../components/EtudiantsTable";
import EtudiantForm from "../components/EtudiantForm";
import "./GestionEtudiants.css";

/*
FAKE DATA (تستعمل فقط أول مرة إذا localStorage فارغ)
*/

const fakeData = [
  {
    idEtudiant: 1,
    cin: "12345678",
    nom: "Ali",
    prenom: "Ben Ali",
    email: "ali@mail.com",
    numTel: "14525897",
    dateNaissance: "2003-01-14",
    adresse: "Monastir",
    dateInscription: "2023-09-15"
  },
  {
    idEtudiant: 2,
    cin: "87654321",
    nom: "Sara",
    prenom: "Ben Mohamed",
    email: "sara@mail.com",
    numTel: "14525887",
    dateNaissance: "2004-10-02",
    adresse: "Monastir",
    dateInscription: "2023-09-15"
  }
];

function GestionEtudiants() {

  /*
  STATES
  */

  const [etudiants, setEtudiants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("Tous les champs");

  const [successMessage, setSuccessMessage] = useState("");

  const fileRef = useRef(null);


  /*
  LOAD DATA FROM LOCAL STORAGE
  */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {

    const savedData = localStorage.getItem("etudiants");

    if (savedData) {

      setEtudiants(JSON.parse(savedData));

    } else {

      setEtudiants(fakeData);

    }

  }, []);


  /*
  SAVE DATA AUTOMATICALLY AFTER ANY CHANGE
  */

  useEffect(() => {

    localStorage.setItem(
      "etudiants",
      JSON.stringify(etudiants)
    );

  }, [etudiants]);


  /*
  ADD OR UPDATE ETUDIANT
  */

  const handleAddOrUpdate = (etudiant) => {

    if (selected) {

      /*
      UPDATE MODE
      */

      setEtudiants(

        etudiants.map((e) =>
          e.idEtudiant === etudiant.idEtudiant
            ? etudiant
            : e
        )

      );

      setSuccessMessage("Étudiant modifié avec succès");

    } else {

      /*
      ADD MODE
      */

      const newId = etudiants.length
        ? Math.max(...etudiants.map(e => e.idEtudiant)) + 1
        : 1;

      const newEtudiant = {
        ...etudiant,
        idEtudiant: newId
      };

      setEtudiants([...etudiants, newEtudiant]);

      setSuccessMessage("Étudiant ajouté avec succès");

    }

    /*
    RESET FORM STATE
    */

    setSelected(null);
    setShowForm(false);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  };


  /*
  DELETE ETUDIANT
  */

  const normalizeSpaces = (value) =>
    typeof value === "string"
      ? value.trim().replace(/\s+/g, " ")
      : value;

  const cleanDigits = (value) =>
    String(value || "").replace(/\D/g, "");

  const cleanEmail = (value) =>
    String(value || "").trim().toLowerCase();

  const cleanEtudiant = (item) => ({
    idEtudiant: item.idEtudiant ? Number(item.idEtudiant) : null,
    cin: cleanDigits(item.cin),
    nom: normalizeSpaces(item.nom),
    prenom: normalizeSpaces(item.prenom),
    email: cleanEmail(item.email),
    numTel: cleanDigits(item.numTel),
    dateNaissance: String(item.dateNaissance || "").trim(),
    adresse: normalizeSpaces(item.adresse),
    dateInscription: String(item.dateInscription || "").trim(),
    nationalite: normalizeSpaces(item.nationalite),
    passport: String(item.passport || "").trim()
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
        case "cin":
        case "cni":
          return "cin";
        case "nom":
          return "nom";
        case "prenom":
          return "prenom";
        case "email":
          return "email";
        case "telephone":
        case "numtel":
        case "num tele":
          return "numTel";
        case "datenaissance":
        case "date naissance":
          return "dateNaissance";
        case "adresse":
          return "adresse";
        case "dateinscription":
        case "date inscription":
          return "dateInscription";
        case "nationalite":
        case "nationalité":
          return "nationalite";
        case "passport":
        case "passeport":
          return "passport";
        case "idetudiant":
        case "id etudiant":
          return "idEtudiant";
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


  /*
  IMPORT BUTTON CLICK
  */

  const handleImportClick = () => {

    fileRef.current.click();

  };


  /*
  IMPORT FILE FUNCTION
  */

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
        .map(cleanEtudiant)
        .filter((item) => item.cin || item.nom || item.prenom);

      if (!cleanedData.length) {
        return alert("Aucune ligne valide trouvée après nettoyage.");
      }

      const nextId = etudiants.length
        ? Math.max(...etudiants.map((e) => e.idEtudiant)) + 1
        : 1;

      const preparedData = cleanedData.map((item, index) => ({
        ...item,
        idEtudiant: item.idEtudiant || nextId + index
      }));

      setEtudiants([...etudiants, ...preparedData]);
      setSuccessMessage(`${preparedData.length} étudiant(s) importé(s) et nettoyé(s)`);

      setTimeout(() => setSuccessMessage(""), 3000);
    };

    reader.readAsText(file);
  };

  const handleDelete = (idEtudiant) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) return;
    setEtudiants(etudiants.filter((e) => e.idEtudiant !== idEtudiant));
    setSuccessMessage("Étudiant supprimé avec succès");
    setTimeout(() => setSuccessMessage(""), 3000);
  };


  /*
  FILTRAGE + SEARCH SYSTEM (CORRECT VERSION)
  */

  const filteredEtudiants = etudiants.filter((e) => {

    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();

    switch (filterBy) {

      case "Nom":
        return e.nom.toLowerCase().includes(term);

      case "Prénom":
        return e.prenom.toLowerCase().includes(term);

      case "Email":
        return e.email.toLowerCase().includes(term);

      default:
        return (
          e.nom.toLowerCase().includes(term) ||
          e.prenom.toLowerCase().includes(term) ||
          e.email.toLowerCase().includes(term) ||
          e.cin.toLowerCase().includes(term)
        );

    }

  });


  /*
  RENDER UI
  */

  return (

    <>
  
      <h2 className="page-title">Gestion des étudiants</h2>
  
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
  
      <div className="page-container">
  
        <div className="search-area">
  
          <select
            className="filter-select"
            value={filterBy}
            onChange={(e) =>
              setFilterBy(e.target.value)
            }
          >
  
            <option value="Tous les champs">
              Tous les champs
            </option>
  
            <option value="Nom">
              Nom
            </option>
  
            <option value="Prénom">
              Prénom
            </option>
  
            <option value="Email">
              Email
            </option>
  
          </select>
  
  
          <input
            type="text"
            placeholder="Rechercher..."
            className="search-input"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
  
        </div>
  
  
        <div className="buttons-area">
  
          <button
            onClick={handleImportClick}
            className="btn import-btn"
          >
            Importer fichier
          </button>
  
  
          <button
            className="btn"
            onClick={() => {
  
              setSelected(null);
              setShowForm(true);
  
            }}
          >
            Nouvel étudiant
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
  
            <EtudiantForm
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
  
  
      <EtudiantsTable
        etudiants={filteredEtudiants}
        onEdit={(e) => {
  
          setSelected(e);
          setShowForm(true);
  
        }}
        onDelete={handleDelete}
      />
  
    </>
  
  );

}

export default GestionEtudiants;