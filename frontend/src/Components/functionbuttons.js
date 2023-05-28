import React from 'react';
import { useNavigate } from 'react-router';

import './functionbuttons.css'

const Logout = ({ setIsAuthenticated }) => {  // destructuring props to get setIsAuthenticated
  let navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem('access_tokezn');
    fetch("http://localhost:5000/api/logout")
      .then((response) =>{
        response.json()
          .then(data =>{
              console.log(data);
              setIsAuthenticated(false);
              navigate('/login');
          })
      })

  };



  return (
    <button onClick={logoutUser} className="logout-btn">Logout</button>
  );
};

export default Logout;
