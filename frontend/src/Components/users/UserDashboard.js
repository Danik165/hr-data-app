import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './userdashboard.css';
//import SkillTable from './skilltable/SkillTable';
import SkillPage from './skillPage'
import Sidebar from '../sidebar/Sidebar';
import Profile  from './profile/Profile';
import Statistics from './Statistics'

const UserDashboard = ({ setIsAuthenticated }) => {
  const isAdmin = false;
  return (
    <div className="dashboard-container">
      <div className='dashboard-body'>    
        <Sidebar setIsAuthenticated={ setIsAuthenticated } isAdmin={isAdmin}/>
     <Routes>
          <Route path="/" element={<SkillPage />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>


    </div>
  );
};

export default UserDashboard;
