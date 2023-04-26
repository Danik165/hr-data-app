import React from 'react';

const UserDashboard = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome to your dashboard.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};


export default (UserDashboard);
