import Sidebar from "./Sidebar";
import NavbarTop from "./NavbarTop";
import "./Layout.css";

/*
Structure global:

HEADER
SIDEBAR + MAIN CONTENT
*/

function Layout({ children }) {
  return (
    <div className="layout">

      {/* HEADER (NAVBAR TOP) */}
      <NavbarTop />

      {/* BODY STRUCTURE */}
      <div className="layout-body">

        {/* LEFT SIDEBAR */}
        <Sidebar />

        {/* RIGHT MAIN CONTENT */}
        <div className="main-content">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;