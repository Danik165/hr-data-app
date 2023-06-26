import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserPage from "./views/userPage/userPage";
import AdminPage from "./views/adminPage/adminPage";
import ForgotPasswordView from "./views/forgotPasswordPage/forgotPasswordPage";
import EnterNewPassword from "./views/enterNewPasswordPage/enterNewPasswordPage";
import LoginPage from "./views/loginPage/loginPage";

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
