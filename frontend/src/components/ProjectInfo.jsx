import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProject } from "../api/projectApi";

const inputClassName =
  "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200";

const STATUS_OPTIONS = ["ACTIVE", "COMPLETED", "ARCHIVED"];

const ProjectInfo = ({ project, onProjectUpdated }) => {
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: project.name ?? "",
    description: project.description ?? "",
    startDate: project.startDate ?? "",
    dueDate: project.dueDate ?? "",
    status: project.status ?? "ACTIVE",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const updatedProject = await updateProject(project.projectId, token, formData);
      setSaved(true);
      onProjectUpdated(updatedProject);
    } catch(e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-xl font-bold text-gray-900">Project Info</h2>
        <p className="mt-1 text-sm text-gray-500">Edit project details below.</p>
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
            className={`${inputClassName} min-h-28 resize-y`}
            placeholder="Describe the project"
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
          Status
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClassName}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {saved && <p className="text-sm text-green-600">Changes saved.</p>}

        <div className="border-t border-gray-200 pt-5">
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectInfo;
