// src/Components/AdminDashboard.js
import React from 'react';

const AdminDashboard = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome to your dashboard.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};


export default (AdminDashboard);
