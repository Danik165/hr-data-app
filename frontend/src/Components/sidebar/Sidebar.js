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
import Logout from '../functionbuttons';


const Sidebar = ({setIsAuthenticated}) => {



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
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
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

export default Sidebar;