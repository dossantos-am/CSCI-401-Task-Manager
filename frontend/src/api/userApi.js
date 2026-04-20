import { apiBaseUrl } from "../config";

export const updateUser = async (userId, token, userData) => {
  const response = await fetch(`${apiBaseUrl}/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) { throw new Error(await response.text()); }

  return response.json();
};

export const deleteUser = async (userId, token) => {
  const response = await fetch(`${apiBaseUrl}/api/users/${userId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) { throw new Error(await response.text()); }
};
