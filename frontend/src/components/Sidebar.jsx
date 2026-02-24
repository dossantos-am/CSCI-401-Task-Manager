import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-6">
      
      <h1 className="text-2xl font-bold mb-10">
        Project Manager
      </h1>
      <hr className='border-gray-800 light:border-zinc-200' />

      <nav className="flex flex-col gap-4">
        <Link 
          to="/" 
          className="hover:bg-gray-700 p-2 rounded transition"
        >
          Dashboard
        </Link>

        <Link 
          to="/projects" 
          className="hover:bg-gray-700 p-2 rounded transition"
        >
          Projects
        </Link>

        <Link 
          to="/tasks" 
          className="hover:bg-gray-700 p-2 rounded transition"
        >
          Tasks
        </Link>
      </nav>

    </div>
  );
};

export default Sidebar;
