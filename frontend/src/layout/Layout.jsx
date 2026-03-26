import Sidebar from "./Sidebar";
import NavbarTop from "./NavbarTop";

function Layout({ children }) {

  return (

    <div style={{ display: "flex" }}>

      <Sidebar />

      <div style={{ flex: 1 }}>

        <NavbarTop />

        <div style={{ padding: "20px" }}>

          {children}

        </div>

      </div>

    </div>

  );

}

export default Layout;