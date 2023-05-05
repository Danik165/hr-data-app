import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import "./login.css";



const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();
 
  const loginUser = async (e) => {
    e.preventDefault();
    

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('access_token', data.hrjwt);
        //setIsAuthenticated(true);
        props.setIsAuthenticated(true);
        navigate("/user");
        //setPage('dashboard');
      } else {
        setError('Failed to log in. Please try again.');
      }
    } catch (err) {
      setError('Failed to log in. Please try again.');
    }

  };



   const goToRegister = () => {
//     setPage('register');
   };


  

  return (
        <div className="login-div" >
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

            <button type="submit" className="login-btn">Login</button>
          </form>
          <p>{error}</p>
          {/* {<p>
            Don't have an account? <button onClick={goToRegister}>Have a nap</button>
          </p> } */}
        </div>

  );
};

export default Login;
