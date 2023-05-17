import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, Route } from 'react-router-dom';



import Logout from '../../functionbuttons';


const AdminSidebar = ({setIsAuthenticated}) => {

   

  return (
    <div style={{ display: 'flex', height: '90vh', overflow: 'scroll initial' }}>
 
      <CDBSidebar textColor="#fff" backgroundColor="#0c4da2">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/admin" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/addusers" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user-plus">Add User/Skills</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/addProject" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="hotel">Add Department/Role</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/admin/skills" activeclasscame="activeClicked">
              <CDBSidebarMenuItem icon="table">Your Skills</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/profile" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter >
          <CDBSidebarMenuItem icon='power-off'>
           <Logout setIsAuthenticated={setIsAuthenticated} /> 
           </CDBSidebarMenuItem>
           
          
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};


export default AdminSidebar;