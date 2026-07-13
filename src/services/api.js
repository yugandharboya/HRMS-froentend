import Cookies from "js-cookie";

import { BASE_URL } from "../constants/constants";

export const getEmployeesApi = async () => {
  const token = Cookies.get("jwt_token");

  const response = await fetch(`${BASE_URL}/employees`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch employees");
  }

  return data;
};
export const getTeamsApi = async () => {
  const token = Cookies.get("jwt_token");

  const response = await fetch(`${BASE_URL}/teams`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }

  return data;
};
export const getAssignedMembersApi = async () => {
  const token = Cookies.get("jwt_token");

  const response = await fetch(`${BASE_URL}/assigned_members`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch assigned members");
  }

  return data;
};
