import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import "./loginform.css";
import { apiurl } from "../../utils/HostData";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiurl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("access_token", data.hrjwt);

        navigate(data.nextPage);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.log(err.message);
      setError("Failed to log in. Please try again.");
    }
  };

  return (
    <form id="login-form" class="pt-4" onSubmit={loginUser}>
      <div class="header pt-2 d-flex justify-content-center">
        <p class="h3  login-header">Login</p>
      </div>

      <div class="form-outline mb-4">
        <input
          type="email"
          id="form2Example1"
          class="form-control-sm w-100"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email ID"
        />
      </div>

      <div class="form-outline mb-4">
        <input
          type="password"
          id="form2Example2"
          class="form-control-sm w-100"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>

      <div class="row mb-4 ">
        <div class="col d-flex justify-content-center">
          <div class="form-check" id="links-container">
            <input
              class="form-check-input"
              type="checkbox"
              id="form2Example34"
            />
            <label
              class="form-check-label"
              id="remember-me-text"
              for="form2Example34"
            >
              {" "}
              Remember me{" "}
            </label>
          </div>
        </div>

        <div class="col">
          <Link to="/forgotpassword" id="forgot-pwd-txt">
            Forgot password?
          </Link>
        </div>
      </div>
      <div class="row mb-2 ">
        <p className="err-message">*{error}</p>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary btn-block mb-4 btn-sm ">
          Sign in
        </button>
      </div>
    </form>
  );
};

export default Login;
