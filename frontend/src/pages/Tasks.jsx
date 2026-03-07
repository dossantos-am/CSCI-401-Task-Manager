import { dummyProjects } from "../assets/dummyProjects";

const Tasks = () => {
  const projects = dummyProjects ?? [];
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
            <button
              key={task.taskId}
              type="button"
              className="w-full rounded-lg border p-4 text-left hover:bg-gray-200"
            >
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <div className="mt-2 text-sm">
                <p>Project: {task.project?.name ?? task.projectName}</p>
                <p>Assignee: {task.assignedTo?.name}</p>
                <p>Status: {task.status}</p>
                <p>Due: {task.dueDate}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
