import { apiBaseUrl } from "../config";

// Create project
export const createProject = async (userId, token,  projectData) => {
    const response = await fetch(
        `${apiBaseUrl}/api/projects?userId=${userId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify(projectData),
        }
    );

    if(!response.ok) { throw new Error(await response.text()); }

    return response.json();
}

// Get all projects
export const getProjects = async (token) => {
    const response = await fetch(
        `${apiBaseUrl}/api/projects`,
        {
            headers: { Authorization: `Bearer ${token}`, },
        }
    );

    if(!response.ok) { throw new Error(await response.text()); }

    return response.json();
}

// Get project by project ID
export const getProjectByProjectId = async (projectId, token) => {
    const response = await fetch(
        `${apiBaseUrl}/api/projects/${projectId}`,
        {
            headers: { Authorization: `Bearer ${token}`, },
        }
    );

    if(!response.ok) { throw new Error(await response.text()); }

    return response.json();
}

// Update project
export const updateProject = async (projectId, token, projectData) => {
    const response = await fetch(
        `${apiBaseUrl}/api/projects/${projectId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(projectData),
        }
    );

    if(!response.ok) { throw new Error(await response.text()); }

    return response.json();
};

// Delete project
export const deleteProject = async (projectId, token) => {
    const response = await fetch(
        `${apiBaseUrl}/api/projects/${projectId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if(!response.ok) { throw new Error(await response.text()); }
}