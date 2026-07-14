import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { registerApi } from "../../../services/api";
import { HiBuildingOffice2 } from "react-icons/hi2";
import "../LoginAdmin/index.css";

const RegisterAdmin = () => {
  const [orgName, setOrgName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await registerApi({
        orgName,
        adminName,
        email,
        password,
      });

      if (data.token) {
        Cookies.set("jwt_token", data.token, { expires: 1 });
        navigate("/");
      } else {
        navigate("/auth/login");
      }
    } catch (error) {
      setErrorMsg(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <HiBuildingOffice2 />
          </div>
          <h2>Create Organization</h2>
          <p className="auth-subtitle">Register your company workspace on HRMS</p>
        </div>

        {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

        <form className="auth-form" onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="orgName">Organization Name</label>
            <input
              type="text"
              id="orgName"
              placeholder="Acme Corp"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="adminName">Admin Name</label>
            <input
              type="text"
              id="adminName"
              placeholder="John Doe"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Work Email</label>
            <input
              type="email"
              id="email"
              placeholder="admin@acme.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? <span className="btn-spinner"></span> : "Create Workspace"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/auth/login" className="auth-switch-link">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
