import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { dummyProjects } from "../assets/dummyProjects";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const projects = dummyProjects ?? [];
  const tasks = projects.flatMap((project) => project.tasks ?? []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Welcome to your Dashboard {user.name}!
      </h1>

      <section className="space-y-3">
        <h2 className="text-3xl font-bold">Projects</h2>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <article key={project.projectId} className="rounded-lg border p-4">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p>{project.description}</p>
              </article>
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
              <article key={task.taskId} className="rounded-lg border p-4">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p>{task.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
