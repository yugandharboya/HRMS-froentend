import React from "react";
import "./index.css";
import AssignTeam from "../../teams/AssignTeam";
import HrmsContext from "../../../context";
import { useContext, useState } from "react";
import DeleteEmployee from "../DeleteEmployee";

const EmployeesTable = ({ displayEmployees }) => {
  const {
    fetchEmployees,
    assignedMembersState,
    setAssignEmployeeId,
    setAssignEmployeeName,
    employeeToEdit,
    setEmployeeToEdit,
  } = useContext(HrmsContext);

  return (
    <table className="employees-table">
      <thead>
        <tr>
          <th className="table-header-cell">ID</th>
          <th className="table-header-cell"> Name</th>
          <th className="table-header-cell">Phone Number</th>
          <th className="table-header-cell">Email</th>
          {/* <th className="table-header-cell">Teams</th> */}
          <th className="table-header-cell">Actions</th>
        </tr>
      </thead>
      <tbody>
        {displayEmployees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>
              {employee.first_name} {employee.last_name}
            </td>
            <td>{employee.phone}</td>
            <td>{employee.email}</td>
            {/* <td>
              <span>software </span>
            </td> */}
            <td className="buttons-cell">
              <button
                className={
                  assignedMembersState.data.some(
                    (member) => member.employee_id === employee.id,
                  )
                    ? "edit-employee-btn assigned-btn"
                    : "edit-employee-btn"
                }
                onClick={() => {
                  (setAssignEmployeeId(employee.id),
                    setAssignEmployeeName(
                      employee.first_name + " " + employee.last_name,
                    ));
                }}
              >
                Assign Team
              </button>
              <button
                className="edit-employee-btn"
                onClick={() => setEmployeeToEdit(employee)}
              >
                Edit
              </button>

              <button
                className="delete-employee-btn"
                onClick={() => DeleteEmployee(employee.id, fetchEmployees)}
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
