import React from 'react';
import logo from '../../Images/logo.png';
import './userdashboard.css';
import Logout from '../functionbuttons';

const UserDashboard = ({ setIsAuthenticated }) => {
  return (
    <div className="dashboard-container">
      <div className="Jeevan-logo">
        <img src={logo} alt="Jeevan Logo" />
      </div>
      <div className="nav-header">
        <button className="nav-button">Account</button>
        <Logout setIsAuthenticated={setIsAuthenticated} /> {/* pass setIsAuthenticated as a prop */}
      </div>
      <div className="main-content">
        <div className="card-container">
          <div className="userprofile gradient-bg box">
            <h2 className="userprofile-header">User Profile</h2>
            {/* Your user profile content will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserDashboard;
