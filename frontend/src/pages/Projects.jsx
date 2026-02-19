import { dummyProjects } from "../assets/dummyProjects";

const Projects = () => {
  const projects = dummyProjects?.[0]?.projects ?? [];

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Projects</h1>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <article key={project.id} className="rounded-lg border p-4">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p>{project.description}</p>
              <div className="mt-2 text-sm">
                <p>Status: {project.status}</p>
                <p>Priority: {project.priority}</p>
                <p>Progress: {project.progress}%</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
