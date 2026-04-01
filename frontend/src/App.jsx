import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";

import GestionEtudiants from "./pages/GestionEtudiants";
import GestionEnseignants from "./pages/GestionEnseignants";

function App() {

return (

<Layout>

<Routes>

<Route path="/" element={<Navigate to="/etudiants" />} />

<Route path="/etudiants" element={<GestionEtudiants />} />

<Route path="/enseignants" element={<GestionEnseignants />} />

</Routes>

</Layout>

);

}

export default App;