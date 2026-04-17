import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateProject } from "../api/projectApi";

const Settings = () => {
  
  const { token } = useContext(AuthContext);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        
      </div>

      <form  className="space-y-5 px-6 py-6">
        <label className="block text-sm font-semibold text-gray-700">
          First Name
          <input
            type="text"
            name="name"
            placeholder="Enter project name"
            required
          />
        </label>
        <label className="block text-sm font-semibold text-gray-700">
          Last Name
          <input
            type="text"
            name="name"
            placeholder="Enter project name"
            required
          />
        </label>

        

        
      </form>
    </div>
  );
};

export default Settings;
