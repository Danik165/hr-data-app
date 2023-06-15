import React from 'react';
import './adminprofile.css';
import AdminSidebar from './adminsidebar/AdminSidebar';
import SkillTable from '../users/skilltable/SkillTable';
import { Routes, Route } from 'react-router-dom';
import Profile  from '../users/profile/Profile';
import UserSkillDetails from './addEmployeeSkillandCertificate/addUserSkill';
import AddDeptRoleProject from './addDeptRoleProject/addDeptRoleProject';
import DashboardPage from './AdminDashboard/dashboardPage';
import UserProfile from './userprofile/UserProfile';

const AdminPage = ({ setIsAuthenticated }) => {
 

  return (
    <div className="dashboard-container">
      <div  className='dashboard-body'>
        <AdminSidebar setIsAuthenticated={setIsAuthenticated}  />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/addusers" element={<UserSkillDetails />} />
          <Route path="/addProject" element={ <AddDeptRoleProject />} />
          <Route path="/skills" element={<SkillTable />} />
          <Route path="/profile" element={<div className='profile-page'><Profile /></div> } />
          <Route path="/userprofile/*" element={<UserProfile />} />
        </Routes>
      </div>
    
    </div>
  );
};

export default AdminPage;
