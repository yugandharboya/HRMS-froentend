import "./index.css";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import EmployeesTable from "../../components/employees/EmployeesTable";
import TeamCards from "../../components/teams/TeamsSection";
import EditEmployee from "../../components/employees/EditEmployeeForm";
import LoadingView from "../../components/common/LoadingView";
import ErrorView from "../../components/common/ErrorView";
import AddEmployeeForm from "../../components/employees/AddEmployeeForm";
import AddTeam from "../../components/teams/AddTeamForm";
import HrmsContext from "../../context";
import AssignTeam from "../../components/teams/AssignTeam";
import PageHeader from "../../components/PageHeader";

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {
    fetchEmployees,
    fetchAssignedMembers,
    fetchTeams,
    employeesState,
    assignedMembersState,
    teamsState,
    assignEmployeeId,
    employeeToEdit,
  } = useContext(HrmsContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
    (fetchAssignedMembers(), fetchTeams());
  }, []);

  return (
    <div className="home-page">
      {assignEmployeeId && <AssignTeam />}
      {employeeToEdit && <EditEmployee />}

      <Header />

      <div className="home-layout-row">
        <Sidebar />

        <div className="main-content-area">
          <PageHeader employeesCount={employeesState.data.length} />

          {employeesState.error && !employeesState.loading && <ErrorView />}

          {employeesState.loading && <LoadingView />}

          {!employeesState.loading && !employeesState.error && (
            <>
              {employeesState.data.length === 0 ? (
                <p className="empty-text">No employees found in db.</p>
              ) : (
                <main className="main-content">
                  <EmployeesTable displayEmployees={employeesState.data} />
                </main>
              )}

              <div className="teams-section">
                <TeamCards />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
