import Sidebar from "./Sidebar";
import NavbarTop from "./NavbarTop";
import "./Layout.css";

function Layout({ children }) {

  return (

    <div className="layout-container">

      <Sidebar />

      <div className="main-area">

        <NavbarTop />

        <div className="page-content">

          {children}

        </div>

      </div>

    </div>

  );

}

export default Layout;