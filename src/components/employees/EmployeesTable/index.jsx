import React, { useContext } from "react";
import { FiEdit3, FiTrash2, FiUserCheck, FiUserPlus } from "react-icons/fi";
import HrmsContext from "../../../context";
import DeleteEmployee from "../DeleteEmployee";
import "./index.css";

const EmployeesTable = ({ displayEmployees }) => {
  const {
    fetchEmployees,
    assignedMembersState,
    setAssignEmployeeId,
    setAssignEmployeeName,
    setEmployeeToEdit,
  } = useContext(HrmsContext);

  const handleAssignClick = (employee) => {
    setAssignEmployeeId(employee.id);
    setAssignEmployeeName(`${employee.first_name} ${employee.last_name}`);
  };

  return (
    <div className="table-responsive-wrapper" tabIndex={0}>
      <table className="employees-table">
        <thead>
          <tr>
            <th className="table-header-cell sticky-col sticky-col-1">ID</th>
            <th className="table-header-cell sticky-col sticky-col-2">Employee Name</th>
            <th className="table-header-cell">Email Address</th>
            <th className="table-header-cell">Phone</th>
            <th className="table-header-cell">Team Status</th>
            <th className="table-header-cell text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayEmployees.map((employee) => {
            const isAssigned = assignedMembersState.data.some(
              (member) => member.employee_id === employee.id
            );

            return (
              <tr key={employee.id} className="table-row">
                <td className="table-cell font-mono sticky-col sticky-col-1">#{employee.id}</td>
                <td className="table-cell font-semibold sticky-col sticky-col-2">
                  {employee.first_name} {employee.last_name}
                </td>
                <td className="table-cell text-muted">{employee.email}</td>
                <td className="table-cell">{employee.phone || "N/A"}</td>
                <td className="table-cell">
                  {isAssigned ? (
                    <span className="badge badge-success">
                      <FiUserCheck className="badge-icon" /> Assigned
                    </span>
                  ) : (
                    <span className="badge badge-neutral">Unassigned</span>
                  )}
                </td>
                <td className="table-cell text-right">
                  <div className="action-buttons-group">
                    <button
                      className={`action-btn ${isAssigned ? "assigned" : "primary"}`}
                      onClick={() => handleAssignClick(employee)}
                      title="Assign Team"
                    >
                      <FiUserPlus />
                      <span>Assign</span>
                    </button>
                    <button
                      className="action-btn secondary"
                      onClick={() => setEmployeeToEdit(employee)}
                      title="Edit Employee"
                    >
                      <FiEdit3 />
                      <span>Edit</span>
                    </button>
                    <button
                      className="action-btn danger"
                      onClick={() => DeleteEmployee(employee.id, fetchEmployees)}
                      title="Delete Employee"
                    >
                      <FiTrash2 />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
