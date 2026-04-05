import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const initialFormData = {
  name: "",
  description: "",
  startDate: "",
  dueDate: "",
  members: [],
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

  const addMember = () => {
    setFormData((currentData) => ({
      ...currentData,
      members: [...currentData.members, {email: "", role: "VIEWER"}],
    }));
  };

  const removeMember = (indexToRemove) => {
    setFormData((currentData) => ({
      ...currentData,
      members: currentData.members.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleMemberChange = (index, field, value) => {
    setFormData((currentData) => ({
      ...currentData,
      members: currentData.members.map((member, currentIndex) => 
        currentIndex === index
        ? {...member, [field]: value}
        : member),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const cleanedMembers = formData.members.map((member) => ({
      email: member.email.trim(),
      role: member.role,
    }))
    .filter((member) => member.email !== "");

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
          members: cleanedMembers,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Create project failed:", response.status, errorText);
      setError('Error ${response.status}: ${errorText || "Failed to create project."}');
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
              Add the project details and optionally invite members by email.
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

          <div className="block text-sm font-semibold text-gray-700">
            <div className="flex items-center justify-between">
              <span>Members</span>
              <button
                type="button"
                onClick={addMember}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  + Add Member
              </button>
            </div>
          

            <div className="mt-3 space-y-3">
              {formData.members.length === 0 && (
                <p className="text-xs font-normal text-gray-500">
                  Optional. Add members by email and choose a role.
                </p>
              )}

              {formData.members.map((member, index) => (
                <div
                  key={index}
                  className="grid gap-3 rounded-xl border border-gray-200 p-3 sm:grid-cols-[1fr_160px_auto]"
                >
                  <input
                    type="email"
                    value={member.email}
                    onChange={(event) =>
                      handleMemberChange(index, "email", event.target.value)
                    }
                    className={inputClassName}
                    placeholder="Enter email address"
                  />
                  
                  <select
                    value={member.role}
                    onChange={(event) =>
                      handleMemberChange(index, "role", event.target.value)
                    }
                    className={inputClassName}
                  >
                    <option value="VIEWER">Viewer</option>
                    <option value="EDITOR">Editor</option>
                  </select>
                  
                  <button
                    type="button"
                    onClick={() => removeMember(index)}
                    className="rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

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
