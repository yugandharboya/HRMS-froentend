import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { loginApi } from "../../../services/api";
import { HiBuildingOffice2 } from "react-icons/hi2";
import "./index.css";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submitLoginForm = async (event) => {
    event.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await loginApi({ email, password });
      Cookies.set("jwt_token", data.token, { expires: 1 });
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message || "Invalid email or password");
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
          <h2>Sign in to HRMS</h2>
          <p className="auth-subtitle">Enter your admin credentials to access your portal</p>
        </div>

        {errorMsg && <div className="auth-error-banner">{errorMsg}</div>}

        <form className="auth-form" onSubmit={submitLoginForm}>
          <div className="form-group">
            <label htmlFor="email">Work Email</label>
            <input
              type="email"
              id="email"
              placeholder="admin@company.com"
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
            {loading ? <span className="btn-spinner"></span> : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Don't have an organization account?</span>
          <Link to="/auth/register" className="auth-switch-link">
            Register Organization
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
