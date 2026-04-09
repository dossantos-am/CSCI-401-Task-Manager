import { apiBaseUrl } from "../config";

// Add member
export const addMember = async (projectId, projectMemberId, token, memberData) => {
    const response = await fetch(
        `${apiBaseUrl}/api/project-members?projectId=${projectId}&userId=${projectMemberId}`,
        {
            method: "POST",
            headers:  {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(memberData),
        }
    );

    if(!response.ok) { throw new Error(await response.text()); }

    return response.json();
}

// Remove member
export const removeMember = async (projectId, projectMemberId, token) => {
    const response = await fetch(
        `${apiBaseUrl}/api/project-members/project/${projectId}/user/${projectMemberId}`,
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

// Edit membership
export const editMembership = async (projectId, projectMemberId, token, memberData) => {
    const response = await fetch(
        `${apiBaseUrl}/api/project-members/project/${projectId}/user/${projectMemberId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(memberData),
        }
    );

    if(!response.ok) { throw new Error(await response.text()); }

    return response.json();
}

// Get all members
export const getMembers = async (projectId, token) => {
    const response = await fetch(
        `${apiBaseUrl}/api/project-members/project/${projectId}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization:  `Bearer ${token}`,
            }
        }
    );

    if(!response.ok) { throw new Error(await response.text()); }

    return response.json();
}