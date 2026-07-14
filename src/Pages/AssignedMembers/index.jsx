import React, { useContext, useEffect, useMemo } from "react";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import PageHeader from "../../components/PageHeader";
import EmployeesTable from "../../components/employees/EmployeesTable";
import HrmsContext from "../../context";
import "../Home/index.css";

const AssignedMembers = () => {
  const {
    fetchAssignedMembers,
    fetchEmployees,
    assignedMembersState,
    employeesState,
  } = useContext(HrmsContext);

  useEffect(() => {
    fetchEmployees();
    fetchAssignedMembers();
  }, []);

  // Memoize assigned employee set lookup
  const membersList = useMemo(() => {
    const assignedEmployeeIds = new Set(
      assignedMembersState.data.map((member) => member.employee_id)
    );

    return employeesState.data.filter((employee) =>
      assignedEmployeeIds.has(employee.id)
    );
  }, [employeesState.data, assignedMembersState.data]);

  return (
    <div className="page-container">
      <Header />
      <div className="page-layout">
        <Sidebar />
        <main className="main-content">
          <PageHeader
            title="Assigned Employees"
            employeesCount={membersList.length}
          />

          {membersList.length === 0 ? (
            <div className="empty-state-card">
              <p>No employees are currently assigned to any team.</p>
            </div>
          ) : (
            <EmployeesTable displayEmployees={membersList} />
          )}
        </main>
      </div>
    </div>
  );
};

export default AssignedMembers;
