import React from 'react';
import logo from '../../Images/logo.png';
import './adminprofile.css';

const AdminDashboard = ({ setIsAuthenticated }) => {
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
        <div className="header-right">
          <div className="dropdown">
            <button className="dropbtn">User</button>
            <div className="dropdown-content">
              <a href="#">Admin</a>
              <a href="#">User1</a>
              <a href="#">User2</a>
            </div>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="main-content">
        <table>
          <thead>
            <tr>
              <th>UserID</th>
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

export default AdminDashboard;
