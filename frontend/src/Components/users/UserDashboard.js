import React from 'react';
import NavHeader from './NavHeader';

const UserDashboard = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      <NavHeader />
      <h2>User Dashboard</h2>
      <p>Welcome to your dashboard.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};


export default (UserDashboard);
