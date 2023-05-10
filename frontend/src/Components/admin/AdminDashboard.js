import React from 'react';
import logo from '../../Images/logo.png';
import './adminprofile.css';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import SkillTable from '../users/SkillTable';

const AdminDashboard = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  return (
    <div className="dashboard-container">
      

      <Header pageHeader="Admin Page" />
      <div  className='dashboard-body'>
      <Sidebar setIsAuthenticated={setIsAuthenticated} isAdmin={true} />
      <SkillTable />
      </div>
     
    </div>
  );
};

export default AdminDashboard;
