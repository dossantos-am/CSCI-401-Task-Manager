import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createProject } from "../api/projectApi";
import SlideAnimation from "../utils/AnimatedContent";

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

    const payload = {
      name: formData.name,
      description: formData.description,
      startDate: formData.startDate,
      dueDate: formData.dueDate,
      status: "ACTIVE",
      members: cleanedMembers,
    };

    try {
      const newProject = await createProject(user.userId, token, payload);
      onProjectCreated(newProject);
      onClose();
    } catch(e) {
      setError(e.message);
    }

  };

  return (
    
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center  bg-gray-950/35 p-4 backdrop-blur-sm sm:p-6">
      <SlideAnimation>
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 overflow-y-auto">
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
                  className="items-center grid gap-3 rounded-xl border border-gray-200 p-3 sm:grid-cols-[1fr_160px_auto]"
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
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-red-600 transition hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Remove project member"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
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
      </SlideAnimation>
    </div>
    
  );
};

export default CreateProjectModal;
