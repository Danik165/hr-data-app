import React, { Component } from 'react';
import './header.css';
import logo from '../../Images/logo.png';



const Header = ( { pageHeader }) => {
  
        return (
        <div className="page-header">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>

            <h1 className='page-title'>{pageHeader}</h1>
        </div>
        );
    
}
 
export default Header;