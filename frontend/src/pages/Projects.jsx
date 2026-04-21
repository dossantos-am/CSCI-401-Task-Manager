import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { capitalizeName } from "../utils/formatters";
import { getProjects } from "../api/projectApi"
import CreateProjectModal from "../components/CreateProjectModal";
import SuccessToast from "../components/SuccessToast";
import { useSearchParams } from "react-router-dom";

const Projects = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";



  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects(token);
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [token]);

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase())
);

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
        ) : filteredProjects.length === 0 ? (
          <p>No projects match "{searchQuery}".</p>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <button
                key={project.projectId}
                type="button"
                onClick={() => navigate(`/projects/${project.projectId}`)}
                className="w-full rounded-lg border p-4 text-left hover:bg-gray-200"
              >
                <h2 className="text-xl font-semibold">{capitalizeName(project.name)}</h2>
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
