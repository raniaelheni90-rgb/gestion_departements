import Sidebar from "./layout/Sidebar";
import GestionEtudiants from "./pages/GestionEtudiants";

function App() {

  return (

    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <GestionEtudiants />

      </div>

    </div>

  );

}

export default App;