import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CreateProjectModal from "../components/CreateProjectModal";
import SuccessToast from "../components/SuccessToast";
import { capitalizeName } from "../utils/formatters";
import { getProjects } from "../api/projectApi";

const statusStyle = (status) => {
  if (status === "COMPLETED") return "text-green-600 font-semibold";
  return "text-blue-600 font-semibold";
};

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const project = await getProjects(token);
        setProjects(project);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [token]);

  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setShowSuccessToast(true);
  };

  return (
    <div className="relative">
      <div
        className={`space-y-6 transition ${
          isCreateProjectOpen ? "pointer-events-none select-none blur-[2px]" : ""
        }`}
        aria-hidden={isCreateProjectOpen}
      >
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold">
            Welcome to your Dashboard {capitalizeName(user.firstName)}!
          </h1>

          <button
            type="button"
            onClick={() => setIsCreateProjectOpen(true)}
            className="shrink-0 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Add Project
          </button>
        </div>

        <section className="rounded-xl border border-gray-200 shadow-sm">
          <div className="rounded-t-xl border-b border-gray-200 bg-gray-50 px-5 py-3">
            <h2 className="text-lg font-bold">Project Overview</h2>
          </div>

          <div className="p-4">
            {loading ? (
              <p className="text-gray-500">Loading projects...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : projects.length === 0 ? (
              <p className="text-gray-500">No projects found.</p>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.projectId}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <h3 className="text-base font-semibold">{project.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{project.description}</p>
                    <div className="mt-3 flex items-end justify-between text-sm">
                      <span className="text-gray-500">
                        Due: {project.dueDate ?? "—"}
                      </span>
                      <span className={statusStyle(project.status)}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
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

export default Dashboard;
