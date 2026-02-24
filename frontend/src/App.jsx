import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";

function App() {
  return (
    <Routes>
      
      <Route path="/login" element={<Login />} />

      
      <Route path="/" 
      element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }
      >
        <Route index element={<Dashboard />} /> 
        <Route path="tasks" element={<Tasks />} />
        <Route path="projects" element={<Projects />} />
      </Route>
    </Routes>
  );
}

export default App;
