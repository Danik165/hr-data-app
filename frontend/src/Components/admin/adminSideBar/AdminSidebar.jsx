import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link, NavLink, Route } from "react-router-dom";

import logo from "../../../Images/Logo_alt.png";
import Logout from "../../logoutButton/logoutButton";

import "./adminSidebar.css";
const adminSidebar = () => {
  return (
    <div
      style={{ display: "flex", height: "100%", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#0c4da2">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/admin">
              <img src={logo} alt="" style={{ width: "40%" }} />
            </Link>
          </div>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/admin" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/addusers" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user-plus">
                Add User/Skills
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/addProject" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="hotel">
                Add Department/Role
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/skills" activeclasscame="activeClicked">
              <CDBSidebarMenuItem icon="table">Your Skills</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/profile" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter>
          <CDBSidebarMenuItem icon="power-off">
            <Logout />
          </CDBSidebarMenuItem>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default adminSidebar;
