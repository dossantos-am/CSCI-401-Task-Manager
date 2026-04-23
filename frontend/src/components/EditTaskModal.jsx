import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateTask, assignTask } from "../api/taskApi";
import { getMembers } from "../api/projectMemberApi";
import { capitalizeName } from "../utils/formatters";

const inputClassName =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200";

const EditTaskModal = ({ task, projectId, onClose, onTaskUpdated }) => {
    const { token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "TODO",
        dueDate: task.dueDate || "",
        assignedTo: "",
    });
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [members, setMembers] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
        setSaved(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError(null);

        try {
            const payload = {
                title: formData.title,
                description: formData.description,
                status: formData.status,
                dueDate: formData.dueDate || null,
                assignedToUserId: task.assignedToUserId,
            };

            let updated = await updateTask(task.taskId, token, payload);

            if (formData.assignedTo !== "") {
                updated = await assignTask(updated.taskId, formData.assignedTo, token);
            }

            setSaved(true);
            onTaskUpdated(updated);
        } catch (e) {
            setError(e.message);
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await getMembers(projectId, token);
                setMembers(data);
            } catch (e) {
                setError(e.message);
            }
        };

        fetchMembers();
    }, [projectId, token]);

    return (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-gray-950/35 p-4 backdrop-blur-sm sm:p-6">
            <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
                <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Edit Task</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Update the details for "{capitalizeName(task.title)}".
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Close edit task form"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
                    <label className="block text-sm font-semibold text-gray-700">
                        Task Title
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="Enter task title"
                            required
                        />
                    </label>

                    <label className="block text-sm font-semibold text-gray-700">
                        Description
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={`${inputClassName} min-h-28 resize-y`}
                            placeholder="Describe the task"
                        />
                    </label>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Due Date
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className={inputClassName}
                            />
                        </label>

                        <label className="block text-sm font-semibold text-gray-700">
                            Status
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={inputClassName}
                            >
                                <option value="TODO">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="DONE">Done</option>
                            </select>
                        </label>
                    </div>

                    <label className="block text-sm font-semibold text-gray-700">
                        Reassign To
                        <select
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                            className={inputClassName}
                        >
                            <option value="">Keep current assignment</option>
                            {members.map((member) => (
                                <option key={member.email} value={member.email}>
                                    {member.firstName} {member.lastName}
                                </option>
                            ))}
                        </select>
                    </label>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {saved && <p className="text-sm text-green-600">Changes saved.</p>}

                    <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-60"
                        >
                            {saving ? "Saving…" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;
