import React, { useEffect, useContext } from "react";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import PageHeader from "../../components/PageHeader";
import EmployeesTable from "../../components/employees/EmployeesTable";
import TeamCards from "../../components/teams/TeamsSection";
import LoadingView from "../../components/common/LoadingView";
import ErrorView from "../../components/common/ErrorView";
import HrmsContext from "../../context";
import "./index.css";

const Home = () => {
  const {
    fetchEmployees,
    fetchAssignedMembers,
    fetchTeams,
    employeesState,
  } = useContext(HrmsContext);

  useEffect(() => {
    fetchEmployees();
    fetchTeams();
    fetchAssignedMembers();
  }, []);

  return (
    <div className="page-container">
      <Header />
      <div className="page-layout">
        <Sidebar />
        <main className="main-content">
          <PageHeader
            title="Dashboard Overview"
            employeesCount={employeesState.data.length}
          />

          {employeesState.loading && <LoadingView />}

          {employeesState.error && !employeesState.loading && <ErrorView />}

          {!employeesState.loading && !employeesState.error && (
            <div className="dashboard-content-grid">
              <div className="employees-section">
                {employeesState.data.length === 0 ? (
                  <div className="empty-state-card">
                    <p>No employees recorded in your organization database.</p>
                  </div>
                ) : (
                  <EmployeesTable displayEmployees={employeesState.data} />
                )}
              </div>

              <div className="dashboard-teams-wrapper">
                <TeamCards />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
