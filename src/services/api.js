import { request } from "./apiClient";

// Auth Services
export const loginApi = (credentials) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const registerApi = (userData) =>
  request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

// Employee Services
export const getEmployeesApi = () => request("/employees");

export const addEmployeeApi = (employeeData) =>
  request("/employees", {
    method: "POST",
    body: JSON.stringify(employeeData),
  });

export const updateEmployeeApi = (id, employeeData) =>
  request(`/employees/${id}`, {
    method: "PUT",
    body: JSON.stringify(employeeData),
  });

export const deleteEmployeeApi = (id) =>
  request(`/employees/${id}`, {
    method: "DELETE",
  });

// Team Services
export const getTeamsApi = () => request("/teams");

export const addTeamApi = (teamData) =>
  request("/teams", {
    method: "POST",
    body: JSON.stringify(teamData),
  });

export const updateTeamApi = (id, teamData) =>
  request(`/teams/${id}`, {
    method: "PUT",
    body: JSON.stringify(teamData),
  });

export const deleteTeamApi = (id) =>
  request(`/teams/${id}`, {
    method: "DELETE",
  });

export const assignEmployeeToTeamApi = (teamId, employeeId) =>
  request(`/teams/${teamId}/assign_team`, {
    method: "POST",
    body: JSON.stringify({ employeeId }),
  });

export const unassignEmployeeFromTeamApi = (teamId, employeeId) =>
  request(`/teams/${teamId}/unassign/${employeeId}`, {
    method: "DELETE",
  });

export const getAssignedMembersApi = () => request("/teams/assigned_members/all");
