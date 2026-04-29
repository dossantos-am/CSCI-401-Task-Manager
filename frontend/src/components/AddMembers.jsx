import { useState } from "react";
import { addMember, removeMember, editMembership } from "../api/projectMemberApi";
import { capitalizeName } from "../utils/formatters";
import ConfirmModal from "./ConfirmModal";
import EditMemberModal from "./EditMemberModal";

const initialFormData = {
  role: "VIEWER",
  email: ""
};

const AddMembers = ({ projectId, userId, token, members, setMembers, membersLoading, canEdit, isOwner }) => {

  const [error, setError] = useState(null);
  const [addMemberError, setAddMemberError] = useState(null);
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

  const handleAddMember = async () => {
    try {
      const data = await addMember(projectId, userId, token, formData);
      setMembers((members) => [...members, data]);
    } catch(e) {
      setAddMemberError(e.message);
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

  if (membersLoading) {
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

            {member.role !== "OWNER" && (
              <div className="items-end flex flex-col gap-2">
                {isOwner && (
                  <>
                    <button
                      type="button"
                      onClick={() => setMemberToEdit(member.userId)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-700"
                      aria-label="Edit membership"
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
                      </svg>
                    </button>
                    <EditMemberModal
                      isOpen={memberToEdit === member.userId}
                      setIsOpen={setMemberToEdit}
                      onConfirm={() => handleEditMembership(member.userId, member.role)}
                      member={member}
                    />
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setMemberToRemove(member.userId)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-red-600 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Remove project member"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <ConfirmModal
                  isOpen={memberToRemove === member.userId}
                  setIsOpen={setMemberToRemove}
                  onConfirm={() => handleRemoveMember(member.userId)}
                  itemName="Are you sure you want to remove this member from the project?"
                  buttonName="Remove"
                />
              </div>
            )}
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
      {canEdit && (
        <div className="border-t border-gray-200 px-6 py-5">
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-32 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            >
              <option value="VIEWER">Viewer</option>
              <option value="EDITOR">Editor</option>
            </select>
            <button
              type="button"
              onClick={handleAddMember}
              className="shrink-0 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Add Member
            </button>
          </div>
          {addMemberError && <p className="text-red-500 text-sm">{addMemberError}</p>}
        </div>
      )}
    </div>
  );
};

export default AddMembers;
