import { dummyProjects } from "../assets/dummyProjects";
import { dummyUsers } from "../assets/dummyUsers";

const Projects = () => {
  const projects = dummyProjects ?? [];
  const usersById = Object.fromEntries(
    dummyUsers.map((user) => [user.userId, user])
  );

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Projects</h1>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <article key={project.projectId} className="rounded-lg border p-4">
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
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
