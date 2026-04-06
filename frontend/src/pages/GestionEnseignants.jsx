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

  const handleDelete = (matricule) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet enseignant ?")) return;
    setEnseignants(enseignants.filter((e) => e.matricule !== matricule));
    setSuccessMessage("Enseignant supprimé avec succès");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleImportClick = () => fileRef.current.click();
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) alert("Fichier sélectionné : " + file.name);
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