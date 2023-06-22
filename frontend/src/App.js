import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserDashboard from "./views/userview/UserPage";
import AdminPage from "./views/adminview/AdminPage";
import EnterEmail from "./views/forgotpasswordview/EnterEmail";
import EnterNewPassword from "./views/resetpasswordview/EnterNewPassword";
import LoginPage from "./views/loginview/loginPage";

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
