import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Welcome to your Dashboard {user.name}!
      </h1>
    </div>
  );
};

export default Dashboard;
