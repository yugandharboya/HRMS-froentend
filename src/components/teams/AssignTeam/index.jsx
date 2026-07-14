import React, { useState, useEffect, useContext } from "react";
import { assignEmployeeToTeamApi } from "../../../services/api";
import HrmsContext from "../../../context";
import { FiX, FiUser, FiLayers } from "react-icons/fi";
import "../../employees/AddEmployeeForm/index.css";

const AssignTeam = () => {
  const {
    teamsState,
    fetchTeams,
    fetchAssignedMembers,
    assignEmployeeId,
    setAssignEmployeeId,
    assignEmployeeName,
    setAssignEmployeeName,
  } = useContext(HrmsContext);

  const [teamId, setTeamId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!teamId) {
      setErrorMsg("Please select a team to assign.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      await assignEmployeeToTeamApi(teamId, assignEmployeeId);
      await fetchAssignedMembers();
      setAssignEmployeeId("");
      setAssignEmployeeName("");
    } catch (error) {
      setErrorMsg(error.message || "Failed to assign employee to team");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAssignEmployeeId("");
    setAssignEmployeeName("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Assign Employee to Team</h3>
          <button className="modal-close-btn" onClick={handleClose}>
            <FiX />
          </button>
        </div>

        {errorMsg && <div className="modal-error-banner">{errorMsg}</div>}

        <form className="modal-form" onSubmit={handleAssign}>
          <div className="form-field">
            <label>Selected Employee</label>
            <div className="input-with-icon">
              <FiUser className="input-icon" />
              <input
                type="text"
                value={assignEmployeeName || `Employee #${assignEmployeeId}`}
                disabled
                style={{ backgroundColor: "var(--surface-alt)" }}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="teamSelect">Target Team</label>
            <div className="input-with-icon">
              <FiLayers className="input-icon" />
              <select
                id="teamSelect"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">-- Select Destination Team --</option>
                {teamsState.data.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Assigning..." : "Confirm Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTeam;
