import React, { useEffect, useContext } from "react";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import PageHeader from "../../components/PageHeader";
import EmployeesTable from "../../components/employees/EmployeesTable";
import LoadingView from "../../components/common/LoadingView";
import ErrorView from "../../components/common/ErrorView";
import HrmsContext from "../../context";
import "../Home/index.css";

const Employees = () => {
  const { employeesState, fetchEmployees, fetchAssignedMembers } = useContext(HrmsContext);

  useEffect(() => {
    fetchEmployees();
    fetchAssignedMembers();
  }, []);

  return (
    <div className="page-container">
      <Header />
      <div className="page-layout">
        <Sidebar />
        <main className="main-content">
          <PageHeader
            title="All Organization Employees"
            employeesCount={employeesState.data.length}
          />

          {employeesState.loading && <LoadingView />}

          {employeesState.error && !employeesState.loading && <ErrorView />}

          {!employeesState.loading &&
            !employeesState.error &&
            employeesState.data.length === 0 && (
              <div className="empty-state-card">
                <p>No employees found in database. Click "Add Employee" to create one.</p>
              </div>
            )}

          {!employeesState.loading &&
            !employeesState.error &&
            employeesState.data.length > 0 && (
              <EmployeesTable displayEmployees={employeesState.data} />
            )}
        </main>
      </div>
    </div>
  );
};

export default Employees;
