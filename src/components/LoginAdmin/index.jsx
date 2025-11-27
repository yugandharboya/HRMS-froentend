import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const submitLoginForm = async (event) => {
    event.preventDefault();

    const userDetails = { email, password };
    const url = "http://localhost:5000/auth/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("data", data);
    if (response.ok) {
      const expiresInHours = 24; // Token expiry time in 24 hours
      const expiryDate = new Date(Date.now() + expiresInHours * 60 * 60 * 1000); // javascript accepts time only in milliseconds
      Cookies.set("jwt_token", data.token, { expires: expiryDate }); // we can pass days only in expires, can't pass seconds or minutes or hours directly

      navigate("/");
    } else {
      alert(data.error_msg);
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
      </form>
    </div>
  );
};
export default LoginAdmin;
