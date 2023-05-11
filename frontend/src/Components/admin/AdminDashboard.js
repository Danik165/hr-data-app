import React from 'react';
import logo from '../../Images/logo.png';
import './adminprofile.css';
import Header from '../header/header';
// import Sidebar from '../sidebar/Sidebar';
import AdminSidebar from './AdminSidebar';
import SkillTable from '../users/SkillTable';
import AddEmployeeForm from './addEmployee';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Profile  from '../users/Profile';

const AdminDashboard = ({ setIsAuthenticated }) => {
 

  return (
    <div className="dashboard-container">
      


      <Header pageHeader="Admin Page" />
      <div  className='dashboard-body'>
      <AdminSidebar setIsAuthenticated={setIsAuthenticated}  />
      <Routes>
        <Route path="/addusers" element={<AddEmployeeForm />} />
        <Route path="/skills" element={<SkillTable />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </div>
     
    </div>
  );
};

export default AdminDashboard;
