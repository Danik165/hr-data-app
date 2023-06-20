import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './userpage.css';
import SkillPage from '../../Components/users/skillPage'
import Sidebar from '../../Components/sidebar/Sidebar';
import Profile  from '../../Components/users/profile/Profile'
import Statistics from '../../Components/users/statistics/Statistics'

const UserDashboard = () => {
  const isAdmin = false;
  return (
    <div className="dashboard-container">
      <div className='dashboard-body'>    
        <Sidebar  isAdmin={isAdmin}/>
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
