import { useEffect, useState } from "react";
import { getMembers, addMember, removeMember, editMembership } from "../api/projectMemberApi";
import { capitalizeName } from "../utils/formatters";
import ConfirmModal from "./ConfirmModal";
import EditMemberModal from "./EditMemberModal";

const initialFormData = {
  role: "VIEWER",
  email: ""
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200";

const AddMembers = ({ projectId, userId, token }) => {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData]  = useState(initialFormData);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [memberToEdit, setMemberToEdit] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getMembers(projectId, token);
        setMembers(data);
      } catch(e) {
        setError(e.message);
      } finally {
        setLoading(false);
      } 
    };

    fetchMembers();
  }, [projectId, token]);

  const handleAddMember = async () => {
    try {
      const data = await addMember(projectId, userId, token, formData);
      setMembers((members) => [...members, data]);
    } catch(e) {
      setError(e.message);
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await removeMember(projectId, userId, token);
      setMembers((currentData) => currentData.filter((member) => member.userId !== userId));
    } catch(e) {
      setError(e.message);
    }
  };

  const handleEditMembership = async (userId, currentRole) => {
    const newRole = currentRole === "EDITOR" ? "VIEWER" : "EDITOR"
    try {
      await editMembership(projectId, userId, token, { role: newRole });
      setMembers((currentMembers) => 
        currentMembers.map((member) => 
          member.userId === userId ? { ...member, role: newRole} : member
        )
      );
    } catch(e) {
      setError(e.message);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading project members...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  let membersContent;
  if(members.length === 0) {
    membersContent = (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <svg
            className="h-7 w-7 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-4a4 4 0 11-8 0 4 4 0 018 0zm6 4a2 2 0 100-4 2 2 0 000 4zm-12 0a2 2 0 100-4 2 2 0 000 4z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-500">No members added</p>
      </div>
    )
  }
  else {
    membersContent = (
      <div className="space-y-3 px-6 py-6">
        {members.map((member) => (
          <div
            key={member.userId}
            className="rounded-xl border border-gray-200 p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {capitalizeName(member.firstName)} {capitalizeName(member.lastName)}
              </h3>

              <div className="mt-3 space-y-1 text-sm text-gray-500">
                <p>Email: {member.email}</p>
                <p>Role: {member.role}</p>
              </div>
            </div>

            {member.role === "OWNER" ? null : (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setMemberToEdit(member.userId)}
                  className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-red-50"
                >
                  Edit
                </button>
                  <EditMemberModal
                    isOpen={memberToEdit === member.userId}
                    setIsOpen={setMemberToEdit}
                    onConfirm={() => handleEditMembership(member.userId, member.role)}
                    member={member}
                  />
                <button
                  type="button"
                  onClick={() => setMemberToRemove(member.userId)}
                  className="rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Remove
                </button>
                  <ConfirmModal
                    isOpen={memberToRemove === member.userId}
                    setIsOpen={setMemberToRemove}
                    onConfirm={() => handleRemoveMember(member.userId)}
                    itemName="Are you sure you want to remove this member from the project?"
                    buttonName="Remove"
                  />
              </div>
            )
  }
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-xl font-bold text-gray-900">Members</h2>
        <p className="mt-1 text-sm text-gray-500">People with access to this project.</p>
      </div>
      {membersContent}
      <div className="border-t border-gray-200 px-6 py-5">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className={inputClassName}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={inputClassName}
        >
          <option value="VIEWER">Viewer</option>
          <option value="EDITOR">Editor</option>
        </select>
        <button
          type="button"
          onClick={handleAddMember}
          className={inputClassName}
        >
          Add Member
        </button>
      </div>
    </div>
  );
};

export default AddMembers;
