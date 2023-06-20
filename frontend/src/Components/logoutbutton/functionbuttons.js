import React from 'react';
import { useNavigate } from 'react-router';
import { apiurl } from '../../utils/HostData';
import './functionbuttons.css'

const Logout = () => { 
  let navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem('access_tokezn');
    fetch(apiurl+"/logout")
      .then((response) =>{
        if(response.status == 200){
          navigate('/login')
        }
       
      })

  };



  return (
    <button onClick={logoutUser} className="logout-btn">Logout</button>
  );
};

export default Logout;
