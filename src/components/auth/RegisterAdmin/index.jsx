import { BASE_URL } from "../../../constants/constants";

import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const RegisterAdmin = () => {
  const [orgName, setOrgName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    console.log("Submitting form with:", {
      orgName,
      adminName,
      email,
      password,
    });

    const userDetails = { orgName, adminName, email, password };

    try {
      const url = `${BASE_URL}/auth/register`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);
      console.log("Response status:", response.status);
      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.message || "Registration failed");
        return;
      }

      Cookies.set("jwt_token", data.token);
      alert("Registration Successful! Please Login.");
      navigate("/auth/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <div className="Register-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="orgName">Organization Name:</label>
          <input
            type="text"
            id="orgName"
            name="orgName"
            value={orgName}
            onChange={(event) => setOrgName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="adminName">Admin Name:</label>
          <input
            type="text"
            id="adminName"
            name="adminName"
            value={adminName}
            onChange={(event) => setAdminName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setemail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setpassword(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Register
        </button>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </form>
      <div className="register-container">
        do you have an account?
        <button
          className="register-button"
          onClick={() => navigate("/auth/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default RegisterAdmin;
