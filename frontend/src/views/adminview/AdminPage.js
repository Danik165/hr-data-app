import React from "react";
import "./adminprofile.css";
import AdminSidebar from "../../Components/admin/adminsidebar/AdminSidebar";
import SkillTable from "../../Components/users/skilltable/SkillTable";
import { Routes, Route } from "react-router-dom";
import Profile from "../../Components/users/profile/Profile";
import UserSkillDetails from "../../Components/admin/addEmployeeSkillandCertificate/addUserSkill";
import AddDeptRoleProject from "../../Components/admin/addDeptRoleProject/addDeptRoleProject";
import DashboardPage from "../../Components/admin/AdminDashboard/dashboardPage";
import UserProfile from "../../Components/admin/userprofile/UserProfile";

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
