import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Link, NavLink } from 'react-router-dom';


import "./Sidebar.css"
import logo from '../../Images/Logo_alt.png';
import Logout from '../logoutbutton/LogoutButtons';


const Sidebar = () => {



  return (
    <div style={{ display: 'flex', height:'100%', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#0c4da2">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <div className="container" style={{ display: 'flex', alignItems: 'center',justifyContent:'center' }}>
            <Link to='/'  ><img
              src={logo}
              alt=""
              style={{ width: '40%' }}
            />
           </Link>
          </div>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/statistics" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="table">Statistics</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/profile" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter >

           <CDBSidebarMenuItem icon="power-off"  ><Logout  />  </CDBSidebarMenuItem>


        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;