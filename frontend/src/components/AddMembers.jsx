import { useEffect, useState } from "react";
import { getMembers, addMember, removeMember } from "../api/projectMemberApi";

const initialFormData = {
  role: "",
  email: ""
};

const AddMembers = ({ projectId, token }) => {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData]  = useState(initialFormData)

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
      const data = await addMember(projectId, token, formData);
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

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-xl font-bold text-gray-900">Members</h2>
        <p className="mt-1 text-sm text-gray-500">People with access to this project.</p>
      </div>

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
    </div>
  );
};

export default AddMembers;
