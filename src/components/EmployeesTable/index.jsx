import React from "react";
import "./index.css";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const EmployeesTable = ({
  fetchedEmployees,
  handleEditEmployee,
  fetchDatabase,
}) => {
  const navigate = useNavigate();

  const handleDeleteEmployee = async (id) => {
    const token = Cookies.get("jwt_token");
    if (!token) {
      alert("Authentication token not found. Please log in again.");
      navigate("/login");
      return;
    }
    try {
      const url = `http://localhost:5000/employees/${id}`;
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        await fetchDatabase();
        alert("User deleted successfully!");
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("An error occurred while deleting the employee.");
    }
  };

  return (
    <table className="employees-table">
      <thead>
        <tr>
          <th className="table-header-cell">ID</th>
          <th className="table-header-cell"> Name</th>
          <th className="table-header-cell">Phone Number</th>
          <th className="table-header-cell">Email</th>
          <th className="table-header-cell">Teams</th>
          <th className="table-header-cell">Actions</th>
        </tr>
      </thead>
      <tbody>
        {fetchedEmployees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>
              {employee.first_name} {employee.last_name}
            </td>
            <td>{employee.phone}</td>
            <td>{employee.email}</td>
            <td>
              <span>software </span>
            </td>
            <td className="buttons-cell">
              <button
                className="edit-employee-btn"
                onClick={() => handleEditEmployee(employee.id)}
              >
                Edit
              </button>

              <button
                className="delete-employee-btn"
                onClick={() => handleDeleteEmployee(employee.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default EmployeesTable;
