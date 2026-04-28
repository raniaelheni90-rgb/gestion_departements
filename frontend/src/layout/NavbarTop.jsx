import "./NavbarTop.css";
import { useEffect, useState } from "react";

function NavbarTop() {
  const [darkMode, setDarkMode] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
    setDarkMode(isDark);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="navbar-top">
      <div className="navbar-left">
        <h3 className="navbar-logo">🎓 UniManage</h3>
      </div>

      <div className="navbar-actions">
        <span className="user">
          {role === 'admin' ? 'Administrateur' : 'Chef de Dép.'}
        </span>

        <button className="dark-btn" onClick={toggleDarkMode} title="Mode Sombre">
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button onClick={handleLogout} className="logout-btn">
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default NavbarTop;