import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import "./enternewpassword.css";
import logo from "../../Images/logo.png";
import { apiurl } from "../../utils/HostData";
import { confirmAlert } from "react-confirm-alert"; // Import

const EnterNewPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const checkOTP = () => {
    if (password.length <= 0) {
      setError("Password cannot be empty");
    } else if (password !== confirmPassword) {
      setError("Passwords Do not match");
    } else {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(password)) {
        setError(
          "Password should be at least 8 characters, have a mix of uppercase and lowercase letters, include at least one number, and one special character."
        );
        return;
      }

      fetch(apiurl + "/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, newPassword: password }),
      })
        .then((response) => {
          if (response.status == 200) {
            confirmAlert({
              title: "Success",
              message: "Password Changed Successfully",
              buttons: [
                {
                  label: "Ok",
                  onClick: () => navigate("/login"),
                },
              ],
            });
          } else {
            response.json().then((data) => {
              setError(data.message);
            });
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };
  return (
    <div class="d-flex justify-content-center align-items-center h-100 ">
      <div
        class="card d-flex justify-content-center align-items-center p-3"
        id="new-password-card"
      >
        <img
          class="card-img-top img-fluid"
          src={logo}
          alt="Jeevan Logo"
          id="Jeevan-logo"
        />
        <div class="card-body d-flex flex-column justify-content-center align-items-center mt-3">
          <input
            placeholder="Enter OTP"
            type="text"
            class="input-field mb-3 "
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <input
            placeholder="Enter New Password"
            type="password"
            class="input-field mb-3 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder="Confirm Password"
            type="password"
            class="input-field mb-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="err-message">*{error}</p>}
          <button type="submit" class="otp-btn mt-3" onClick={checkOTP}>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterNewPassword;
