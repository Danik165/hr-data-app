import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import "./enteremail.css";
import logo from "../../Images/logo.png";


const EnterEmail = () =>{
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [error,setError ] = useState('');
    const generateOTP = () =>{
        console.log("Generate OTP called");
        navigate('/newpassword')
    }
    return(
        <div className='email-component'>
        <div className='Jeevan-logo'>
          <img src={logo} alt="Jeevan Logo"></img>
        </div>
        <div className="email-div">
          <h2 className="email-header">Enter Email ID</h2>
          <form onSubmit={generateOTP} className="login-form">
            <label className='input-label'>
              Email:
            </label>
            <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />

            {error &&  <p className="err-message">{error}</p>}
            <button type="submit" className="otp-btn">Generate OTP</button>
          </form>
        </div>
      </div>
    )
};

export default EnterEmail;