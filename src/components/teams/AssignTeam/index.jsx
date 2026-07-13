import { BASE_URL } from "../../../constants/constants";
import HrmsContext from "../../../context";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import "./index.css";

const AssignTeam = () => {
  const {
    teamsState,
    fetchTeams,
    assignEmployeeId,
    setAssignEmployeeId,
    assignEmployeeName,
    setAssignEmployeeName,
  } = useContext(HrmsContext);

  const [teamId, setTeamId] = useState(null);

  const assignEmployeeToTeam = async () => {
    if (!teamId) {
      alert("Please select a team to assign.");
      return;
    }
    const token = Cookies.get("jwt_token");
    const userDetails = {
      employeeId: assignEmployeeId,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userDetails),
    };
    try {
      const url = `${BASE_URL}/teams/${teamId}/assign_team`;
      const response = await fetch(url, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to assign employee to team");
      }
      alert("Employee assigned to a team successfully !");
      setAssignEmployeeId("");
      setAssignEmployeeName("");
    } catch (error) {
      alert(`Failed to assign employee to team: ${error.message}`);
    }
  };
  useEffect(() => {
    fetchTeams();
  }, []);
  return (
    <div className="assign-team">
      <h3 className="select-team-title">Select Team</h3>
      <p>Employee: {assignEmployeeName}</p>
      <select
        className="team-select-dropdown"
        onChange={(e) => setTeamId(e.target.value)}
      >
        <option value="">--Assign To Team--</option>
        {teamsState.data.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <div className="assign-team-buttons">
        <button className="assign-team-btn" onClick={assignEmployeeToTeam}>
          Assign
        </button>
        <button
          className="cancel-assign-btn"
          onClick={() => setAssignEmployeeId("")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AssignTeam;
