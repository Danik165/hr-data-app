import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';



import Logout from '../functionbuttons';


const AdminSidebar = ({setIsAuthenticated}) => {

   

  return (
    <div style={{ display: 'flex', height: '92vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/admindashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/search" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="search">Search</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/skills" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Skills</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter >
          
           <CDBSidebarMenuItem icon="power-off"  ><Logout setIsAuthenticated={setIsAuthenticated} />  </CDBSidebarMenuItem>
           
          
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};


export default AdminSidebar;