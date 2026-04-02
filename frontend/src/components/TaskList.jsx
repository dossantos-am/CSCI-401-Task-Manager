const TaskList = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-xl font-bold text-gray-900">Tasks</h2>
        <p className="mt-1 text-sm text-gray-500">All tasks for this project.</p>
      </div>

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
    </div>
  );
};

export default TaskList;
