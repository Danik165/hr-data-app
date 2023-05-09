import React from 'react';
import logo from '../../Images/logo.png';
import './adminprofile.css';
const AdminDashboard = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };
//
//  return (
//    <div>
//      <h2>Admin Dashboard</h2>
//      <p>Welcome to your dashboard.</p>
//      <button onClick={handleLogout}>Logout</button>
//    </div>
//  );
//};
//
//
//export default (AdminDashboard);



  return (
    <div className="dashboard-container">
      <div className="Jeevan-logo">
        <img src={logo} alt="Jeevan Logo" />
      </div>
      <div className="nav-header">
        <button className="nav-button">Account</button>
        <button className="nav-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <div className="card-container">
          <div className="userprofile gradient-bg box">
            <h2 className="userprofile-header">UserProfile</h2>
            {/* User profile content will go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

