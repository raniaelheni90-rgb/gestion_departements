import React, { useState, useEffect, useRef } from "react";

import Layout from "../layout/Layout";
import EtudiantsTable from "../components/EtudiantsTable";
import EtudiantForm from "../components/EtudiantForm";

import "./GestionEtudiants.css";

// Fake data
const fakeData = [
  {
    idEtudiant: 1,
    cin: "12345678",
    nom: "Ali",
    prenom: "Ben Ali",
    email: "ali@mail.com",
    numTel: "14525897",
    dateNaissance: "2003-01-14",
    adresse: "monastir",
    dateInscription: "15/09/2023"
  },

  {
    idEtudiant: 2,
    cin: "87654321",
    nom: "Sara",
    prenom: "Ben Mohamed",
    email: "sara@mail.com",
    numTel: "14525887",
    dateNaissance: "2004-10-02",
    adresse: "monastir",
    dateInscription: "15/09/2023"
  }
];

function GestionEtudiants() {

  const [etudiants, setEtudiants] = useState([]);

  const [selected, setSelected] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const fileRef = useRef();

  useEffect(() => {

    setEtudiants(fakeData);

  }, []);

  const handleAddOrUpdate = (etudiant) => {

    if (selected) {

      setEtudiants(

        etudiants.map((e) =>

          e.idEtudiant === etudiant.idEtudiant

            ? etudiant

            : e

        )

      );

    } else {

      setEtudiants([

        ...etudiants,

        etudiant

      ]);

    }

    setSelected(null);

    setShowForm(false);

  };

  const handleDelete = (id) => {

    setEtudiants(

      etudiants.filter(

        (e) => e.idEtudiant !== id

      )

    );

  };

  const handleImportClick = () => {

    fileRef.current.click();

  };

  const handleImport = (e) => {

    const file = e.target.files[0];

    if (file) {

      alert(

        "Fichier sélectionné: " +

        file.name

      );

    }

  };

  return (

    <Layout>

      <h2>Gestion des étudiants</h2>

<div className="page-container">

  <div>

    <select className="filter-select">
      <option>Tous les champs</option>
      <option>Nom</option>
      <option>Prénom</option>
      <option>Email</option>
    </select>

    <input
      type="text"
      placeholder="Rechercher..."
      className="search-input"
    />

  </div>

  <div>

    <button
      onClick={handleImportClick}
      className="btn import-btn"
    >
      Importer fichier
    </button>

    <button
      className="btn"
      onClick={() => setShowForm(true)}
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
{
  showForm && (

    <div className="modal-overlay">

      <div className="modal-content">

        <EtudiantForm
          selected={selected}
          onSubmit={handleAddOrUpdate}
          onCancel={() => setShowForm(false)}
        />

      </div>

    </div>

  )
}

      <EtudiantsTable

        etudiants={etudiants}

        onEdit={(e) => {

          setSelected(e);

          setShowForm(true);

        }}

        onDelete={handleDelete}

      />

    </Layout>

  );

}

export default GestionEtudiants;