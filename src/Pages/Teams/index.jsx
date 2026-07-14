import React, { useContext, useEffect, useMemo } from "react";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import TeamsSection from "../../components/teams/TeamsSection";
import EmployeesTable from "../../components/employees/EmployeesTable";
import HrmsContext from "../../context";
import "../Home/index.css";

const Teams = () => {
  const {
    fetchEmployees,
    fetchAssignedMembers,
    fetchTeams,
    assignedMembersState,
    employeesState,
    activeTeamId,
  } = useContext(HrmsContext);

  useEffect(() => {
    fetchEmployees();
    fetchAssignedMembers();
    fetchTeams();
  }, []);

  // Memoize filtered members to prevent unnecessary re-renders
  const teamMembers = useMemo(() => {
    if (!activeTeamId) return [];

    const activeMemberIds = new Set(
      assignedMembersState.data
        .filter((member) => member.team_id === activeTeamId)
        .map((member) => member.employee_id)
    );

    return employeesState.data.filter((employee) =>
      activeMemberIds.has(employee.id)
    );
  }, [employeesState.data, assignedMembersState.data, activeTeamId]);

  return (
    <div className="page-container">
      <Header />
      <div className="page-layout">
        <Sidebar />
        <main className="main-content">
          <div className="dashboard-content-grid">
            <TeamsSection />

            <div className="team-members-header" style={{ marginTop: "1rem" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "700", marginBottom: "0.875rem" }}>
                Team Members List ({teamMembers.length})
              </h3>
              {teamMembers.length === 0 ? (
                <div className="empty-state-card">
                  <p>No employees are assigned to this team yet.</p>
                </div>
              ) : (
                <EmployeesTable displayEmployees={teamMembers} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Teams;
