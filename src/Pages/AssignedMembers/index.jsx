import "./index.css";
import { useContext, useState, useEffect } from "react";
import HrmsContext from "../../context";
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
import PageHeader from "../../components/PageHeader";
import EmployeesTable from "../../components/employees/EmployeesTable";

const AssignedMembers = () => {
  const {
    fetchAssignedMembers,
    fetchEmployees,
    assignedMembersState,
    employeesState,
  } = useContext(HrmsContext);

  const [membersList, setMembersList] = useState([]);

  const getTeamMembers = () => {
    const data = employeesState.data.filter((employee) => {
      return assignedMembersState.data.some((member) => {
        return member.employee_id === employee.id;
      });
    });

    setMembersList(data);
  };

  useEffect(() => {
    fetchEmployees();
    fetchAssignedMembers();
  }, []);

  useEffect(() => {
    if (
      employeesState.data.length > 0 &&
      assignedMembersState.data.length > 0
    ) {
      getTeamMembers();
    }
  }, [employeesState.data, assignedMembersState.data]);

  return (
    <div className="assigned-members-page">
      <Header />
      <div className="assigned-row-layout">
        <Sidebar />
        <div className="assigned-main">
          <div className="assigned-main-content">
            <EmployeesTable displayEmployees={membersList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedMembers;
