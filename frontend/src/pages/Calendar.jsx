import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProjects } from "../api/projectApi";
import { getTasksByProjectId } from "../api/taskApi";
import CalendarBox from "../components/CalendarBox";
import CalendarEvents from "../components/CalendarEvents";

const toDateStr = (date) => {
  if (!date) return null;
  return date.split("T")[0];
};

const Calendar = () => {
  const { token } = useContext(AuthContext);

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

  const goToToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth());
    setSelectedDate(toDateStr(today.toISOString()));
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
        <CalendarBox
          currentYear={currentYear}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          allTasks={allTasks}
          projects={projects}
          loading={loading}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          setSelectedDate={setSelectedDate}
          goToToday={goToToday}
        />
        <CalendarEvents
          selectedDate={selectedDate}
          selectedTasks={selectedTasks}
          selectedProjects={selectedProjects}
        />
      </div>
    </div>
  );
};

export default Calendar;
