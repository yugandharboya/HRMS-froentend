import React, { useState, useContext } from "react";
import { updateEmployeeApi } from "../../../services/api";
import HrmsContext from "../../../context";
import { FiX, FiUser, FiMail, FiPhone } from "react-icons/fi";
import "../AddEmployeeForm/index.css";

const EditEmployeeForm = () => {
  const { employeeToEdit, setEmployeeToEdit, fetchEmployees } =
    useContext(HrmsContext);

  const [firstName, setFirstName] = useState(employeeToEdit?.first_name || "");
  const [lastName, setLastName] = useState(employeeToEdit?.last_name || "");
  const [email, setEmail] = useState(employeeToEdit?.email || "");
  const [phone, setPhone] = useState(employeeToEdit?.phone || "");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await updateEmployeeApi(employeeToEdit.id, {
        firstName,
        lastName,
        email,
        phone,
      });
      await fetchEmployees();
      setEmployeeToEdit(null);
    } catch (error) {
      setErrorMsg(error.message || "Failed to update employee details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Edit Employee Details</h3>
          <button
            className="modal-close-btn"
            onClick={() => setEmployeeToEdit(null)}
          >
            <FiX />
          </button>
        </div>

        {errorMsg && <div className="modal-error-banner">{errorMsg}</div>}

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="editFirstName">First Name</label>
              <div className="input-with-icon">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  id="editFirstName"
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="editLastName">Last Name</label>
              <div className="input-with-icon">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  id="editLastName"
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="editEmail">Email Address</label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="editEmail"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="editPhone">Phone Number</label>
            <div className="input-with-icon">
              <FiPhone className="input-icon" />
              <input
                type="tel"
                id="editPhone"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEmployeeToEdit(null)}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeForm;
