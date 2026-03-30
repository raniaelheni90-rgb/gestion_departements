import "./Sidebar.css";

import {

  FaUserGraduate,

  FaChalkboardTeacher

} from "react-icons/fa";


function Sidebar() {

  return (

    <div className="sidebar">

      <h2 className="logo">

        🎓 UniDepart

      </h2>
      <nav>
        <ul>
          <li className="active">
            <FaUserGraduate />
            Gestion Étudiants
            </li>
            <li>
              <FaChalkboardTeacher />
              Gestion Enseignants
              </li>
              </ul></nav>
              </div>
              );
            }
            export default Sidebar;