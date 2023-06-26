import React from "react";
import "./adminPage.css";
import AdminSidebar from "../../components/admin/adminsidebar/AdminSidebar";
import SkillTable from "../../components/users/skilltable/SkillTable";
import { Routes, Route } from "react-router-dom";
import Profile from "../../components/users/profile/Profile";
import UserSkillDetails from "../../components/admin/addEmployeeSkillAndCertificate/addUserSkill";
import AddDeptRoleProject from "../../components/admin/addDeptRoleProject/addDeptRoleProject";
import DashboardPage from "../../components/admin/adminDashboard/dashboardPage";
import UserProfile from "../../components/admin/userprofile/UserProfile";

const AdminPage = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-body">
        <AdminSidebar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/addusers" element={<UserSkillDetails />} />
          <Route path="/addProject" element={<AddDeptRoleProject />} />
          <Route path="/skills" element={<SkillTable />} />
          <Route
            path="/profile"
            element={
              <div class="w-100 overflow-auto">
                <Profile />
              </div>
            }
          />
          <Route path="/userprofile/*" element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
