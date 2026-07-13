import "./index.css";
import Sidebar from "../../components/common/Sidebar";
import { useContext, useEffect, useState } from "react";
import HrmsContext from "../../context";
import Header from "../../components/common/Header";
import EmployeesTable from "../../components/employees/EmployeesTable";
import EditEmployee from "../../components/employees/EditEmployeeForm";
import TeamsSection from "../../components/teams/TeamsSection";

const Teams = () => {
  const {
    fetchEmployees,
    fetchAssignedMembers,
    fetchTeams,
    assignedMembersState,
    employeesState,
    activeTeamId,
  } = useContext(HrmsContext);

  const [teamMembers, setTeamMembers] = useState([]);

  const getTeamMembers = () => {
    const data = employeesState.data.filter((employee) => {
      return assignedMembersState.data.some((member) => {
        return (
          member.employee_id === employee.id && member.team_id === activeTeamId
        );
      });
    });

    setTeamMembers(data);
  };

  useEffect(() => {
    fetchEmployees();
    fetchAssignedMembers();
    fetchTeams();
  }, []);
  useEffect(() => {
    getTeamMembers();
  }, [employeesState.data, assignedMembersState.data, activeTeamId]);

  return (
    <div className="team-members-page">
      <Header />
      <div className="team-members-layout">
        <Sidebar />
        <div className="team-members-main">
          <TeamsSection />
          <EmployeesTable displayEmployees={teamMembers} />
        </div>
      </div>
    </div>
  );
};

export default Teams;
