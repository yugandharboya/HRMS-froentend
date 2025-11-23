import "./index.css";
import { useState } from "react";
// POST http://localhost:5000/auth/register
// Content-Type: application/json

//  {
//   "orgName": "TechLabs",
//   "adminName": "Rajesh",
//   "email": "admin@techlabs.com",
//   "password": "admin123"
// }

const RegisterAdmin = () => {
  const [orgName, setOrgName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();

    const userDetails = { orgName, adminName, email, password };
    const url = "https://hrms-backend-0bid.onrender.com/auth/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
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
      </form>
    </div>
  );
};
export default RegisterAdmin;
