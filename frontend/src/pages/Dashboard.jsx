import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { dummyProjects } from "../assets/dummyProjects";
import CreateProjectModal from "../components/CreateProjectModal";
import SuccessToast from "../components/SuccessToast";
import { capitalizeName } from "../utils/formatters";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const projects = dummyProjects ?? [];
  const tasks = projects.flatMap((project) => project.tasks ?? []);

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

        <section className="space-y-3">
          <h2 className="text-3xl font-bold">Projects</h2>
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <button
                  key={project.projectId}
                  type="button"
                  className="w-full rounded-lg border p-4 text-left hover:bg-gray-200"
                >
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p>{project.description}</p>
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-bold">Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <button
                  key={task.taskId}
                  type="button"
                  className="w-full rounded-lg border p-4 text-left hover:bg-gray-200"
                >
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  <p>{task.description}</p>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>

      {isCreateProjectOpen ? (
        <CreateProjectModal
          onClose={() => setIsCreateProjectOpen(false)}
          onProjectCreated={() => setShowSuccessToast(true)}
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
