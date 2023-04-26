import React, { useState } from 'react';

const Login = ({ setPage, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      // API call to login the user
      // const response = await yourApi.loginUser(email, password);
      // Mock successful response
      const response = { status: 200, data: { access_token: 'your_token' } };
      if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access_token);
        setIsAuthenticated(true);
        setPage('dashboard');
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
