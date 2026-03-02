import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <NavBar />

        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
};


export default Layout;
