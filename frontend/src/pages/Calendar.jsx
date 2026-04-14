import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getProjects } from "../api/projectApi";
import { getTasksByProjectId } from "../api/taskApi";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const toDateStr = (date) => {
  if (!date) return null;
  return date.split("T")[0];
};

const toDayKey = (year, month, day) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

const Calendar = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  const [projects, setProjects] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const projectData = await getProjects(token);
        setProjects(projectData);

        const taskArrays = await Promise.all(
          projectData.map((p) =>
            getTasksByProjectId(p.projectId, token).then((tasks) =>
              tasks.map((t) => ({
                ...t,
                projectId: p.projectId,
                projectName: p.name,
              }))
            )
          )
        );
        setAllTasks(taskArrays.flat());
      } catch {
        // calendar shows no dots on error
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [token]);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
  const todayKey = toDayKey(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const selectedTasks = selectedDate
    ? allTasks.filter((t) => toDateStr(t.dueDate) === selectedDate)
    : [];
  const selectedProjects = selectedDate
    ? projects.filter((p) => toDateStr(p.dueDate) === selectedDate)
    : [];

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Calendar</h1>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        {/* LEFT: Calendar */}
        <div className="rounded-xl border border-gray-200 shadow-sm">
          {/* Month navigation */}
          <div className="flex items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-5 py-3">
            <button
              type="button"
              onClick={prevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-lg transition hover:bg-gray-200"
            >
              ‹
            </button>
            <h2 className="text-lg font-bold">
              {MONTHS[currentMonth]} {currentYear}
            </h2>
            <button
              type="button"
              onClick={nextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-lg transition hover:bg-gray-200"
            >
              ›
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {DAYS.map((d) => (
              <div
                key={d}
                className="py-2 text-center text-xs font-semibold uppercase text-gray-500"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          {loading ? (
            <p className="p-4 text-sm text-gray-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-7">
              {Array.from({ length: totalCells }).map((_, i) => {
                const dayNum = i - firstDayOfMonth + 1;
                const isValid = dayNum >= 1 && dayNum <= daysInMonth;
                const key = isValid ? toDayKey(currentYear, currentMonth, dayNum) : null;
                const isToday = key === todayKey;
                const isSelected = key === selectedDate;

                const hasTask = key
                  ? allTasks.some((t) => toDateStr(t.dueDate) === key)
                  : false;
                const hasProject = key
                  ? projects.some((p) => toDateStr(p.dueDate) === key)
                  : false;

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={!isValid}
                    onClick={() => isValid && setSelectedDate(key)}
                    className={[
                      "flex min-h-[56px] flex-col items-center border-b border-r border-gray-100 py-2 transition",
                      !isValid ? "cursor-default bg-gray-50" : "cursor-pointer hover:bg-gray-100",
                      isSelected ? "bg-gray-900 hover:bg-gray-800" : "",
                    ].join(" ")}
                  >
                    {isValid && (
                      <>
                        <span
                          className={[
                            "flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium",
                            isSelected
                              ? "text-white"
                              : isToday
                              ? "bg-blue-500 text-white"
                              : "text-gray-700",
                          ].join(" ")}
                        >
                          {dayNum}
                        </span>
                        <div className="mt-1 flex gap-1">
                          {hasTask && (
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          )}
                          {hasProject && (
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                          )}
                        </div>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Legend */}
          <div className="flex gap-4 rounded-b-xl border-t border-gray-200 bg-gray-50 px-5 py-2 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Task due
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Project due
            </span>
          </div>
        </div>

        {/* RIGHT: Day detail panel */}
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
              <div className="space-y-3">
                {selectedProjects.map((p) => (
                  <button
                    key={p.projectId}
                    type="button"
                    onClick={() => navigate(`/projects/${p.projectId}`)}
                    className="w-full rounded-lg border border-gray-200 p-3 text-left transition hover:bg-gray-100"
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
                    className="w-full rounded-lg border border-gray-200 p-3 text-left transition hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                        Task
                      </span>
                      <span className="text-sm font-semibold text-gray-900">{t.title}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-400">in {t.projectName}</p>
                    {t.description && (
                      <p className="mt-1 line-clamp-2 text-xs text-gray-500">{t.description}</p>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
