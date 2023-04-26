import React, { useState } from 'react';

const Register = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      // API call to register the user
      // const response = await yourApi.registerUser(email, password);
      // Mock successful response
      const response = { status: 201 };
      if (response.status === 201) {
        setPage('login');
      }
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={registerUser}>
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
        <button type="submit">Register</button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Register;
