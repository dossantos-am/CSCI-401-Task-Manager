import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getTasksByProjectId } from "../api/taskApi";
import { getProjectByProjectId } from "../api/projectApi";
import ProjectInfo from "../components/ProjectInfo";
import TaskList from "../components/TaskList";
import AddMembers from "../components/AddMembers";
import CreateTaskModal from "../components/CreateTaskModal";

const SingleProject = () => {
  const { projectId } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskLoading, setTaskLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskError, setTaskError] = useState(null);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectByProjectId(projectId, token);
        setProject(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, token]);


    useEffect(() => {
      const fetchTasks = async () => {
        try {
          setTaskError(null);
          const data = await getTasksByProjectId(projectId, token);
          setTasks(data);
        } catch (e) {
          setTaskError(e.message);
        } finally {
          setTaskLoading(false);
        }
      };

      fetchTasks();
    }, [projectId, token]);

  if (loading) {
    return <p className="text-gray-500">Loading project...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => navigate("/projects")}
        className="flex items-center gap-1 text-sm text-gray-500 transition hover:text-gray-800"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Projects
      </button>

      <h1 className="text-3xl font-bold">{project.name}</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <ProjectInfo
          project={project}
          onProjectUpdated={(updated) => setProject(updated)}
        />

        <div className="space-y-3">
          {taskLoading ? (
            <p className="text-gray-500">Loading tasks...</p>
          ) : taskError ? (
            <p className="text-red-500">{taskError}</p>
          ) : (
            <TaskList
              tasks={tasks}
              onCreateTask={() => setIsCreateTaskOpen(true)}
            />
          )}
        </div>
      </div>

      <AddMembers projectId={projectId} token={token}/>

      {isCreateTaskOpen && (
        <CreateTaskModal
          projectId={projectId}
          onClose={() => setIsCreateTaskOpen(false)}
          onTaskCreated={(newTask) => {
            setTasks((currentTasks) => [newTask, ...currentTasks]);
          }}
        />
      )}
    </div>
  );
};

export default SingleProject;