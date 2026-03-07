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
  );
};

export default Dashboard;
