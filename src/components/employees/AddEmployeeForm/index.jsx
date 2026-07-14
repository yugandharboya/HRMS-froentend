import React, { useState, useContext } from "react";
import { addEmployeeApi } from "../../../services/api";
import HrmsContext from "../../../context";
import { FiX, FiUser, FiMail, FiPhone } from "react-icons/fi";
import "./index.css";

const AddEmployeeForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { fetchEmployees, setShowAddEmployeeForm } = useContext(HrmsContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await addEmployeeApi({
        firstName,
        lastName,
        email,
        phone,
      });
      await fetchEmployees();
      setShowAddEmployeeForm(false);
    } catch (error) {
      setErrorMsg(error.message || "Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Add New Employee</h3>
          <button
            className="modal-close-btn"
            onClick={() => setShowAddEmployeeForm(false)}
          >
            <FiX />
          </button>
        </div>

        {errorMsg && <div className="modal-error-banner">{errorMsg}</div>}

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="firstName">First Name</label>
              <div className="input-with-icon">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="lastName">Last Name</label>
              <div className="input-with-icon">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  required
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="email">Work Email</label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="email"
                placeholder="john.doe@company.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-with-icon">
              <FiPhone className="input-icon" />
              <input
                type="tel"
                id="phone"
                placeholder="+1 (555) 000-0000"
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
              onClick={() => setShowAddEmployeeForm(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Adding..." : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
