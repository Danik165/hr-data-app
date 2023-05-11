import React from 'react';
import logo from '../../Images/logo.png';
import './userdashboard.css';
import Header from '../header/header';
import SkillTable from './SkillTable';
import Sidebar from '../sidebar/Sidebar';


const UserDashboard = ({ setIsAuthenticated }) => {
  const isAdmin = false;
  return (
  
    <div className="dashboard-container">
      <Header pageHeader="User Profile"/>
      <div className='dashboard-body'>
        <Sidebar setIsAuthenticated={ setIsAuthenticated } isAdmin={isAdmin}/>
        <SkillTable  />
      </div>
      
      
    </div>
  );
};

export default UserDashboard;
