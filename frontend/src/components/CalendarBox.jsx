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

const CalendarBox = ({
  currentYear,
  currentMonth,
  selectedDate,
  allTasks,
  projects,
  loading,
  prevMonth,
  nextMonth,
  setSelectedDate,
  goToToday,
}) => {
  const today = new Date();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
  const todayKey = toDayKey(today.getFullYear(), today.getMonth(), today.getDate());

  return (
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
      <div className="grid grid-cols-7 border-b border-gray-200 ">
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
                  "flex min-h-14 flex-col items-center border-b border-r border-gray-100 py-2 transition",
                  !isValid ? "cursor-default bg-gray-50" : "cursor-pointer hover:bg-gray-200",
                  isSelected ? "bg-gray-900 hover:bg-gray-700" : "",
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
      <div className="flex items-center justify-between rounded-b-xl border-t border-gray-200 bg-gray-50 px-5 py-2 text-xs text-gray-500">
        <div className="flex gap-4">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Task due
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          Project due
        </span>
        </div>
        <button
          type="button"
          onClick={goToToday}
          className="rounded-lg px-2 py-0.5 text-xs hover:bg-gray-200 transition"
        >
          Today
        </button>
      </div>
    </div>
  );
};

export default CalendarBox;
