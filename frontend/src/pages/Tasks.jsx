const Tasks = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Tasks</h1>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Tasks By Project</h2>
        <p className="mt-2 text-sm text-gray-600">
          Tasks are currently managed within each individual project.
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Open a project from the Projects page to view or create tasks.
        </p>
      </div>
    </div>
  );
};

export default Tasks;