import { capitalizeName } from "../utils/formatters";

const TaskList = ({ tasks, onCreateTask, onEditTask, onTaskToDelete, canEdit }) => {
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
              className="relative rounded-xl border border-gray-200 p-4"
            >
              {canEdit && (
                <>
                  <button
                    type="button"
                    onClick={() => onEditTask(task)}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Edit task"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => onTaskToDelete(task)}
                    className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-lg text-red-400 transition hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Delete task"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>                
                </>
              )}
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