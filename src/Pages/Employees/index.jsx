import "./index.css";
import { useState, useEffect, useContext } from "react";
import Header from "../../components/common/Header";
import EmployeesTable from "../../components/employees/EmployeesTable";
import EditEmployee from "../../components/employees/EditEmployeeForm";
import Sidebar from "../../components/common/Sidebar";
import AddEmployeeForm from "../../components/employees/AddEmployeeForm";
import HrmsContext from "../../context";
import LoadingView from "../../components/common/LoadingView";
import ErrorView from "../../components/common/ErrorView";
import PageHeader from "../../components/PageHeader";

const Employees = () => {
  const { employeesState, fetchEmployees } = useContext(HrmsContext);
  const [activeEmployeeToAdd, setActiveEmployeeToAdd] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="all-employees-page">
      <Header />

      {activeEmployeeToAdd && (
        <AddEmployeeForm setActiveEmployeeToAdd={setActiveEmployeeToAdd} />
      )}

      <div className="all-employees-wrapper">
        <Sidebar />

        <div className="main-content-area">
          <PageHeader employeesCount={employeesState.data.length} />

          {employeesState.error && <ErrorView />}

          {employeesState.loading && <LoadingView />}

          {!employeesState.loading &&
            !employeesState.error &&
            employeesState.data.length === 0 && (
              <p className="empty-text">No employees found in Database.</p>
            )}

          {!employeesState.loading &&
            !employeesState.error &&
            employeesState.data.length > 0 && (
              <EmployeesTable displayEmployees={employeesState.data} />
            )}
        </div>
      </div>
    </div>
  );
};

export default Employees;
