import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CreateProjectModal from "../components/CreateProjectModal";
import SuccessToast from "../components/SuccessToast";
import { capitalizeName } from "../utils/formatters";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl fond-bold text-gray-900">Getting Started</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create a project to start organizing your work, inviting members, and managing tasks.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
            <p className="mt-2 text-sm text-gray-600">
              View and manage all your projects from the Projects page.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
            <p className="mt-2 text-sm text-gray-600">
              Tasks are managed inside each individual project.
            </p>
          </div>
        </section>
      </div>

      {isCreateProjectOpen ? (
        <CreateProjectModal
          onClose={() => setIsCreateProjectOpen(false)}
          onProjectCreated={() =>  setShowSuccessToast(true)}
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