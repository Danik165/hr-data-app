import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminSidebar from "../../Components/admin/adminsidebar/adminSidebar";

import DashboardPage from "../../components/admin/adminDashboard/dashboardPage";
import UserSkillDetails from "../../components/admin/addEmployeeSkillAndCertificate/AddEmployeeSkill";
import AddDeptRoleProject from "../../components/admin/addDeptRoleProject/addDeptRoleProject";
import SkillTable from "../../Components/users/skillTable/skillTable";
import Profile from "../../Components/users/profile/profile";
import UserProfile from "../../Components/admin/userProfile/userProfile";

import "./adminPage.css";
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
