import React, { useState, useContext } from "react";
import { addTeamApi } from "../../../services/api";
import HrmsContext from "../../../context";
import { FiX, FiUsers, FiAlignLeft } from "react-icons/fi";
import "../../employees/AddEmployeeForm/index.css";

const AddTeamForm = () => {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { fetchTeams, setShowAddTeamForm } = useContext(HrmsContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await addTeamApi({
        name: teamName,
        description: teamDescription,
      });
      await fetchTeams();
      setShowAddTeamForm(false);
    } catch (error) {
      setErrorMsg(error.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Create New Team</h3>
          <button
            className="modal-close-btn"
            onClick={() => setShowAddTeamForm(false)}
          >
            <FiX />
          </button>
        </div>

        {errorMsg && <div className="modal-error-banner">{errorMsg}</div>}

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="teamName">Team Name</label>
            <div className="input-with-icon">
              <FiUsers className="input-icon" />
              <input
                type="text"
                id="teamName"
                placeholder="Engineering, Design, HR..."
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="teamDescription">Team Description</label>
            <div className="input-with-icon">
              <FiAlignLeft className="input-icon" style={{ top: "0.875rem" }} />
              <textarea
                id="teamDescription"
                placeholder="Brief summary of team functions and objectives"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                rows={3}
                disabled={loading}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowAddTeamForm(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Save Team"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamForm;
