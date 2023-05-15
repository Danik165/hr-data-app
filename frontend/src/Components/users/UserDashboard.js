import React from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from '../../Images/logo.png';
import './userdashboard.css';
import Header from '../header/header';
import SkillTable from './SkillTable';
import Sidebar from '../sidebar/Sidebar';
import Profile  from '../users/Profile';


const UserDashboard = ({ setIsAuthenticated }) => {
  const isAdmin = false;
  return (
    <div className="dashboard-container">
      <Header pageHeader="User Profile"/>
      <div className='dashboard-body'>
        <Sidebar setIsAuthenticated={ setIsAuthenticated } isAdmin={isAdmin}/>
     <Routes>
          <Route path="/" element={<SkillTable />} />
          <Route path="/skills" element={<SkillTable />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      
      
    </div>
  );
};

export default UserDashboard;
