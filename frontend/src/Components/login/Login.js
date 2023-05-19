import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import "./login.css";
import logo from "../../Images/logo.png";
import { Link } from 'react-router-dom';



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

    // <div class="d-flex flex-column p-2 align-items-center justify-content-center login-div">
    //   <p class="login-header font-weight-light">Login Account</p>
    //   <form onSubmit={loginUser} className="login-form">
    //     <label className='input-label'>
    //       Email:
    //     </label>
    //     <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />

    //     <label className='input-label'>
    //       Password:
    //     </label>
    //     <input type="password" className="input-field"value={password} onChange={(e) => setPassword(e.target.value)} required />
    //     {error &&  <p className="err-message">{error}</p>}
    //     <Link to="/forgotpassword" type="button" className='forgot-password-btn'>Forgot Password or Have no Account yet?</Link>
    //     <button type="submit" className="login-btn">Login</button>
    //   </form>
    // </div>

    <form id="login-form" class="pt-4" onSubmit={loginUser}>
      <div class="header pt-2 d-flex justify-content-center">
        <p class='h3  login-header' >Login</p>
      </div>

    <div class="form-outline mb-4">
      {/* <label class="form-label" for="form2Example1"></label> */}
      <input type="email" id="form2Example1" class="form-control-sm w-100" onChange={(e) => setEmail(e.target.value)} placeholder="Email ID"/>
    </div>
  

    <div class="form-outline mb-4">

      <input type="password" id="form2Example2" class="form-control-sm w-100"  onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
    </div>
  

    <div class="row mb-4 ">
      <div class="col d-flex justify-content-center">

        <div class="form-check" id="links-container">
          <input class="form-check-input" type="checkbox"  id="form2Example34"  />
          <label class="form-check-label" id="remember-me-text" for="form2Example34"> Remember me </label>
        </div>
      </div>
  
      <div class="col">

        <Link to="/forgotpassword" id="forgot-pwd-txt">Forgot password?</Link>
      </div>
    </div>
  <div class='row mb-2 '>
    <p id='error-msg'>{error}</p>
  </div>
   <div class='d-flex justify-content-center'>
    <button type="submit" class="btn btn-primary btn-block mb-4 btn-sm ">Sign in</button>
    </div>
    </form>  


);

};

export default Login;
