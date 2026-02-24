import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      
      <Sidebar />

      <div className="flex flex-col flex-1">
        <NavBar />

        <div className="p-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
};


export default Layout;
