import React from "react";
import { Routes, Route } from "react-router-dom";
import "./userPage.css";
import SkillPage from "../../components/users/userDashboard/userDashboard";
import Sidebar from "../../Components/users/sideBar/Sidebar";
import Profile from "../../components/users/profile/Profile";
import Statistics from "../../components/users/statistics/Statistics";

const UserPage = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<SkillPage />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route
            path="/profile"
            element={
              <div class="overflow-auto w-100">
                <Profile />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default UserPage;
