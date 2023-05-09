import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import "./login.css";
import logo from "../../Images/logo.png";



const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
 
  const loginUser = async (e) => {
    e.preventDefault();
    

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('access_token', data.hrjwt);
        props.setIsAuthenticated(true);
        navigate(data.nextPage);
      } else {
        setError('Failed to log in. Please try again.');
      }
    } catch (err) {
      console.log(err.message)
      setError('Failed to log in. Please try again.');
    }

  };


return (
  <div className='Login-component'>
    <div className='Jeevan-logo'>
      <img src={logo} alt="Jeevan Logo"></img>
    </div>
    <div className="login-div">
      <h2 className="login-header">Login</h2>
      <form onSubmit={loginUser} className="login-form">
        <label className='input-label'>
          Email:
        </label>
        <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className='input-label'>
          Password:
        </label>
        <input type="password" className="input-field"value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error &&  <p className="err-message">{error}</p>}
        <button type="button" className='forgot-password-btn'>Forgot Password or Have no Account yet?</button>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  </div>
);

};

export default Login;
