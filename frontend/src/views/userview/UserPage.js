import React from "react";
import { Routes, Route } from "react-router-dom";
import "./userpage.css";
import SkillPage from "../../components/users/skillPage";
import Sidebar from "../../components/sidebar/Sidebar";
import Profile from "../../components/users/profile/Profile";
import Statistics from "../../components/users/statistics/Statistics";

const UserDashboard = () => {
  const isAdmin = false;
  return (
    <div className="dashboard-container">
      <div className="dashboard-body">
        <Sidebar isAdmin={isAdmin} />
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

export default UserDashboard;
