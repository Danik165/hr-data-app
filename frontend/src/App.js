import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserPage from "./views/userPageview/userPage";
import AdminPage from "./views/adminView/adminPage";
import ForgotPasswordView from "./views/forgotPasswordView/forgotPasswordView";
import EnterNewPassword from "./views/enterNewPasswordView/enterNewPassword";
import LoginPage from "./views/loginview/loginPage";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route
            exact
            path="/forgotpassword"
            element={<ForgotPasswordView />}
          />
          <Route path="/newpassword/*" element={<EnterNewPassword />} />
          <Route path="/*" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
