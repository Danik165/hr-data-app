import React from 'react';
import './adminprofile.css';
import Header from '../header/header';
import AdminSidebar from './adminsidebar/AdminSidebar';
import SkillTable from '../users/SkillTable';
import { Routes, Route } from 'react-router-dom';
import Profile  from '../users/Profile';
import UserSkillDetails from './addEmployeeSkillandCertificate/addUserSkill';
import AddDeptRoleProject from './addDeptRoleProject/addDeptRoleProject';
import DashboardPage from './AdminDashboard/dashboardPage';
import UserProfile from './userprofile/UserProfile';

const AdminPage = ({ setIsAuthenticated }) => {
 

  return (
    <div className="dashboard-container">
        {/* <Header pageHeader="Admin Page" hrefHeader='/admin' /> */}
      <div  className='dashboard-body'>
        <AdminSidebar setIsAuthenticated={setIsAuthenticated}  />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/addusers" element={<UserSkillDetails />} />
          <Route path="/addProject" element={ <AddDeptRoleProject />} />
          <Route path="/skills" element={<SkillTable />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userprofile/*" element={<UserProfile />} />
        </Routes>
      </div>
    
    </div>
  );
};

export default AdminPage;
