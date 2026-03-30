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

    <div className="navbar">

      <h3>Dashboard Administrateur</h3>

      <div className="user">

        admin

      </div>
      
      <button
  className="dark-btn"
  onClick={toggleDarkMode}
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>

    </div>

  );

}

export default NavbarTop;