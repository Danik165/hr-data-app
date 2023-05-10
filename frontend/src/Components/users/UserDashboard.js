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
      <div className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <table>
          <thead>
            <tr>
              <th>Skill</th>
              <th>Years</th>
              <th>Level</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {/* Rows will go here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
