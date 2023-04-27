import React, { useState } from 'react';

const Login = ({ setPage, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      localStorage.setItem('access_token', data.access_token);
      setIsAuthenticated(true);
      setPage('dashboard');
    } else {
      setError('Failed to log in. Please try again.');
    }
  } catch (err) {
    setError('Failed to log in. Please try again.');
  }
};



  const goToRegister = () => {
    setPage('register');
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
      <p>
        Don't have an account? <button onClick={goToRegister}>Register</button>
      </p>
    </div>
  );
};

export default Login;
