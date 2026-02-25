import { dummyProjects } from "../assets/dummyProjects";

const Tasks = () => {
  const projects = dummyProjects?.[0]?.projects ?? [];
  const tasks = projects.flatMap((project) =>
    (project.tasks ?? []).map((task) => ({
      ...task,
      projectName: project.name,
    }))
  );

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Tasks</h1>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <article key={task.id} className="rounded-lg border p-4">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <div className="mt-2 text-sm">
                <p>Project: {task.projectName}</p>
                <p>Assignee: {task.assignee?.name ?? task.assigneeId}</p>
                <p>Status: {task.status}</p>
                <p>Priority: {task.priority}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
