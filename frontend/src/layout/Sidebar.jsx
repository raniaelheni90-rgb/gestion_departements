import "./Sidebar.css";

import {
  FaUserGraduate,
  FaChalkboardTeacher
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {

return (

<div className="sidebar">

<h2 className="logo">
🎓 UniDepart
</h2>

<nav>

<ul>

<li>

<NavLink
to="/etudiants"
className={({ isActive }) =>
isActive ? "active-link" : ""
}
>

<FaUserGraduate />

Gestion Étudiants

</NavLink>

</li>

<li>

<NavLink
to="/enseignants"
className={({ isActive }) =>
isActive ? "active-link" : ""
}
>

<FaChalkboardTeacher />

Gestion Enseignants

</NavLink>

</li>

</ul>

</nav>

</div>

);

}

export default Sidebar;