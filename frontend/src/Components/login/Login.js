import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';




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
        <div>
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <br />
            <button type="submit">Login</button>
          </form>
          <p>{error}</p>
          {<p>
            Don't have an account? <button onClick={goToRegister}>Have a nap</button>
          </p> }
        </div>

  );
};

export default Login;
