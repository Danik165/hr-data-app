import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminPage from "./views/adminPage/AdminPage";
import EnterNewPassword from "./views/enterNewPasswordPage/enterNewPasswordPage";
import EnterEmail from "./views/forgotPasswordPage/forgotPasswordPage";
import LoginPage from "./views/loginPage/loginPage";
import UserDashboard from "./views/userPage/UserPage";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route exact path="/forgotpassword" element={<EnterEmail />} />
          <Route path="/newpassword/*" element={<EnterNewPassword />} />
          <Route path="/*" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
