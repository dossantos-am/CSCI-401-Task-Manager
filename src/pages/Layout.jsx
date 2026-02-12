import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
//import CreateProjectModal from "../components/CreateProjectModal";

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  //const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Welcome, {user.name}</h2>
        <button onClick={logout}>Logout</button>
      </header>

      <button onClick={null}>New Project</button>

      

      <Outlet />
    </div>
  );
};

export default Layout;
