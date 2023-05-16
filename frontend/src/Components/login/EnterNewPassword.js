import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import "./enternewpassword.css";
import logo from "../../Images/logo.png";


const EnterNewPassword = () =>{
    const navigate = useNavigate();
    const [otp,setOtp] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error,setError ] = useState('');
    const checkOTP = () =>{
        console.log("Check OTP called");
        navigate('/login');

    }
    return(
        <div className='new-password-component'>
        <div className='Jeevan-logo'>
          <img src={logo} alt="Jeevan Logo"></img>
        </div>
        <div className="new-password-div">
          <h2 className="new-password-header">Set New Password</h2>
          <form onSubmit={checkOTP} className="new-password-form">
            <label className='input-label'>
              OTP:
            </label>
            <input type="text" className="input-field" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            <label className='input-label'>
              Password:
            </label>
            <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label className='input-label'>
              Confirm Password:
            </label>
            <input type="password" className="input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            {error &&  <p className="err-message">{error}</p>}
            <button type="submit" className="update-pwd-btn">Update Password</button>
          </form>
        </div>
      </div>
    )
};

export default EnterNewPassword;