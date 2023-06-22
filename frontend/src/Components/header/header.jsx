import React, { Component } from "react";
import "./header.css";
import logo from "../../Images/logo.png";

const Header = ({ pageHeader, hrefHeader }) => {
  return (
    <div className="page-header">
      <div className="logo">
        <a href={hrefHeader}>
          <img src={logo} alt="Logo" />
        </a>
      </div>

      <h1 className="page-title">{pageHeader}</h1>
    </div>
  );
};

export default Header;
