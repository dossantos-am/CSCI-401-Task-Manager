import { capitalizeName } from "../utils/formatters";

const TaskList = ({ tasks, onCreateTask, canEdit }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
        <div>
          <h2 className="text-xl fond-bold text-gray-900 font-bold">Tasks</h2>
          <p className="mt-1 text-sm text-gray-500">All tasks for this project.</p>
        </div>

        {canEdit && (
          <button
            type="button"
            onClick={onCreateTask}
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm fond-semibold text-white transition hover:bg-gray-700"
          >
            Add Task
          </button>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-7 w-7 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500">No tasks added</p>
        </div>
      ) : (
        <div className="space-y-3 px-6 py-6">
          {tasks.map((task) => (
            <div
              key={task.taskId}
              className="rounded-xl border border-gray-200 p-4"
            >
              <h3 className="text-lg font-semibold text-gray-900">{capitalizeName(task.title)}</h3>
              <p className="mt-1 text-sm text-gray-600">
                {task.description || "No description"}
              </p>

              <div className="mt-3 space-y-1 text-sm text-gray-500">
                <p>Due: {task.dueDate || "No due date"}</p>
                <p>Status: {task.status}</p>
                <p>Assigned to: {task.assignedToName || "Unassigned"}</p> 
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;