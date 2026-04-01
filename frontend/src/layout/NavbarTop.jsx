import "./NavbarTop.css";
import { useEffect, useState } from "react";
function NavbarTop() {
  const [darkMode, setDarkMode] = useState(false);

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
return (

  <div className="navbar-top">

    {/* titre page */}

    <h3 className="navbar-title">

      Dashboard Administrateur

    </h3>


    {/* right section */}

    <div className="navbar-actions">

      <span className="user">

        admin

      </span>

      <button
        className="dark-btn"
        onClick={toggleDarkMode}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

    </div>

  </div>

);

}

export default NavbarTop;