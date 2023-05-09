import React from 'react';
import logo from '../../Images/logo.png';
import './userdashboard.css';

const UserDashboard = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  return (
    <div className="dashboard-container">
      <div className="Jeevan-logo">
        <img src={logo} alt="Jeevan Logo" />
      </div>
      <div className="nav-header">
        <button className="nav-button">Account</button> {/* Added class to buttons */}
        <button className="nav-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <div className="card-container">
          <div className="userprofile gradient-bg box">
            <h2 className="userprofile-header">UserProfile</h2>
            {/* Your user profile content will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
