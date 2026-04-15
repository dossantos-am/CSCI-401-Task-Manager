import { useNavigate } from "react-router-dom";

const CalendarEvents = ({ selectedDate, selectedTasks, selectedProjects }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm">
      <div className="rounded-t-xl border-b border-gray-200 bg-gray-50 px-5 py-3">
        <h2 className="text-lg font-bold">
          {selectedDate
            ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Day Details"}
        </h2>
      </div>

      <div className="p-4">
        {!selectedDate ? (
          <p className="text-sm text-gray-500">Select a date to view events.</p>
        ) : selectedTasks.length === 0 && selectedProjects.length === 0 ? (
          <p className="text-sm text-gray-500">No events found this day.</p>
        ) : (
          <div className="space-y-3 ">
            {selectedProjects.map((p) => (
              <button
                key={p.projectId}
                type="button"
                onClick={() => navigate(`/projects/${p.projectId}`)}
                className="w-full rounded-lg border border-gray-200 p-3 text-left transition hover:bg-gray-200"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                    Project
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{p.name}</span>
                </div>
                {p.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">{p.description}</p>
                )}
              </button>
            ))}

            {selectedTasks.map((t) => (
              <button
                key={t.taskId}
                type="button"
                onClick={() => navigate(`/projects/${t.projectId}`)}
                className="w-full rounded-lg border border-gray-200 p-3 text-left transition hover:bg-gray-200"
              >
                <div className="flex items-center gap-2 ">
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                    Task
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{t.title}</span>
                </div>
                <p className="mt-0.5 text-xs text-gray-400 ">in {t.projectName}</p>
                {t.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">{t.description}</p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarEvents;
