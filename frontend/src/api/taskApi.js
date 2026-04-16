import { apiBaseUrl } from "../config";

// Get all tasks for a project
export const getTasksByProjectId = async (projectId, token) => {
    const response = await fetch(
        `${apiBaseUrl}/api/tasks?projectId=${projectId}`,
        {
            headers: { Authorization: `Bearer ${token}`, },
        }
    );

    if(!response.ok) { throw new Error(await response.text()); }

    return response.json();
};

// Create task
export const createTask = async (projectId, token, taskData) => {
    const response = await fetch(
        `${apiBaseUrl}/api/tasks?projectId=${projectId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(taskData),
        }
    );

    if(!response.ok) { throw new Error(await response.text()); }

    return response.json();
};

// Update task
export const updateTask = async (taskId, token, taskData) => {
    const response = await fetch(
        `${apiBaseUrl}/api/tasks/${taskId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(taskData),
        }
    );

    if(!response.ok) { throw new Error(await response.text()); }
    
    return response.json();
};

// Delete task
export const deleteTask = async (taskId, token) => {
    const response = await fetch(
        `${apiBaseUrl}/api/tasks/${taskId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if(!response.ok) { throw new Error(await response.text()); }
};

export const assignTask = async (taskId, email, token) => {
    const response = await fetch(
        `${apiBaseUrl}/api/tasks/${taskId}/assign`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email: email }),
        }
    );
    
    if(!response.ok) { throw new Error(await response.text()); }

    return response.json();
};