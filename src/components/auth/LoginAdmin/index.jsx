import { BASE_URL } from "../../../constants/constants";

import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const submitLoginForm = async (event) => {
    event.preventDefault();

    const userDetails = { email, password };
    try {
      const url = `${BASE_URL}/auth/login`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(url, options);

      let data = null;
      try {
        data = await response.json();
      } catch {
        // server responded but not json or empty body or plain text
      }

      if (response.status === 401 || response.status === 400) {
        setErrorMsg(data?.message || "Invalid email or password");
        return;
      }

      if (!response.ok) {
        // 500, 502, etc
        setErrorMsg("Server error. Please try again later.");
        return;
      }

      Cookies.set("jwt_token", data.token, { expires: 1 });

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={submitLoginForm}>
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
          Login
        </button>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </form>
      <div className="register-container">
        do not have an account?
        <button
          className="register-button"
          onClick={() => navigate("/auth/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};
export default LoginAdmin;
