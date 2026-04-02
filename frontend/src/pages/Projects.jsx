import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { capitalizeName } from "../utils/formatters";
import CreateProjectModal from "../components/CreateProjectModal";
import SuccessToast from "../components/SuccessToast";

const Projects = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch projects.");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [apiBaseUrl, token]);

  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setShowSuccessToast(true);
  };

  return (
    <div className="relative">
      <div
        className={`space-y-4 transition ${
          isCreateProjectOpen ? "pointer-events-none select-none blur-[2px]" : ""
        }`}
        aria-hidden={isCreateProjectOpen}
      >
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold">Projects</h1>

          <button
            type="button"
            onClick={() => setIsCreateProjectOpen(true)}
            className="shrink-0 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Add Project
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading projects...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <button
                key={project.projectId}
                type="button"
                onClick={() => navigate(`/projects/${project.projectId}`)}
                className="w-full rounded-lg border p-4 text-left hover:bg-gray-200"
              >
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p>{project.description}</p>
                <div className="mt-2 text-sm">
                  <p>Owner: {capitalizeName(project.createdByName)}</p>
                  <p>Status: {project.status}</p>
                  <p>Start: {project.startDate}</p>
                  <p>Due: {project.dueDate}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {isCreateProjectOpen ? (
        <CreateProjectModal
          onClose={() => setIsCreateProjectOpen(false)}
          onProjectCreated={handleProjectCreated}
        />
      ) : null}

      {showSuccessToast ? (
        <SuccessToast
          message="Project created successfully"
          onDone={() => setShowSuccessToast(false)}
        />
      ) : null}
    </div>
  );
};

export default Projects;
