
const SummaryBoxes = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
            <p className="text-sm font-medium text-blue-600">Total Projects</p>
            <p className="mt-1 text-3xl font-bold text-blue-700">{projects.length}</p>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-sm">
            <p className="text-sm font-medium text-green-600">Completed</p>
            <p className="mt-1 text-3xl font-bold text-green-700">
              {projects.filter((p) => p.status === "COMPLETED").length}
            </p>
          </div>
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 shadow-sm">
            <p className="text-sm font-medium text-yellow-600">Overdue</p>
            <p className="mt-1 text-3xl font-bold text-yellow-700">
              {projects.filter((p) => p.status !== "COMPLETED" && p.dueDate && new Date(p.dueDate) < new Date()).length}
            </p>
          </div>
    </div>
  );
};

export default SummaryBoxes;
