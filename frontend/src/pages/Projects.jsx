import { useState } from "react";
import { dummyProjects } from "../assets/dummyProjects";
import { dummyUsers } from "../assets/dummyUsers";
import CreateProjectModal from "../components/CreateProjectModal";

const Projects = () => {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const projects = dummyProjects ?? [];
  const usersById = Object.fromEntries(
    dummyUsers.map((user) => [user.userId, user])
  );

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
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p>{project.description}</p>
                <div className="mt-2 text-sm">
                  <p>
                    Owner:{" "}
                    {usersById[project.createdBy?.userId]?.name ??
                      project.createdBy?.name}
                  </p>
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
        <CreateProjectModal onClose={() => setIsCreateProjectOpen(false)} />
      ) : null}
    </div>
  );
};

export default Projects;
