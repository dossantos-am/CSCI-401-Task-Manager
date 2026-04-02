import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const initialFormData = {
  name: "",
  description: "",
  startDate: "",
  dueDate: "",
  members: "",
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200";

const CreateProjectModal = ({ onClose, onProjectCreated }) => {
  const { token, user } = useContext(AuthContext);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const response = await fetch(
      `${apiBaseUrl}/api/projects?userId=${user.userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          startDate: formData.startDate,
          dueDate: formData.dueDate,
          status: "ACTIVE",
        }),
      }
    );

    if (!response.ok) {
      setError("Failed to create project. Please try again.");
      return;
    }

    const newProject = await response.json();
    onProjectCreated(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-gray-950/35 p-4 backdrop-blur-sm sm:p-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Project</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add the basic project details. Members are optional and should be
              entered as email addresses only.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-gray-500 transition hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close create project form"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          <label className="block text-sm font-semibold text-gray-700">
            Project Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Enter project name"
              required
            />
          </label>

          <label className="block text-sm font-semibold text-gray-700">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClassName} min-h-32 resize-y`}
              placeholder="Describe the project"
              required
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-gray-700">
              Start Date
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={inputClassName}
                required
              />
            </label>

            <label className="block text-sm font-semibold text-gray-700">
              Due Date
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={inputClassName}
                required
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-gray-700">
            Members by Email
            <textarea
              name="members"
              value={formData.members}
              onChange={handleChange}
              className={`${inputClassName} min-h-28 resize-y`}
              placeholder="Add emails separated by commas or new lines"
            />
            <span className="mt-2 block text-xs font-normal text-gray-500">
              Optional. Example: alex@email.com, jordan@email.com
            </span>
          </label>
          {error && <p className="text-sm text-red-500">{error}</p>}
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
              className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
