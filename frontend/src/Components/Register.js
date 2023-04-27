import React, { useState } from 'react';

const Register = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const registerUser = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 201) {
      setPage('login');
    } else {
      setError('Failed to register. Please try again.');
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
