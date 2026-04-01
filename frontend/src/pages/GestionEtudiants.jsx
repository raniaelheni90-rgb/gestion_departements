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

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet étudiant ?"
    );
  
    if (!confirmDelete) return;
  
    setEtudiants(
      etudiants.filter(
        (e) => e.idEtudiant !== id
      )
    );  
    setEtudiants(filtered);

    setSuccessMessage("Étudiant supprimé avec succès");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

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

    if (file) {

      alert("Fichier sélectionné : " + file.name);

    }

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