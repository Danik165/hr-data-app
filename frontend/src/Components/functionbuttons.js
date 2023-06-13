import React from 'react';
import { useNavigate } from 'react-router';
import { apiurl } from '../utils/HostData';
import './functionbuttons.css'

const Logout = ({ setIsAuthenticated }) => {  // destructuring props to get setIsAuthenticated
  let navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem('access_tokezn');
    fetch(apiurl+"/logout")
      .then((response) =>{
        if(response.status == 200){

          //window.location.replace(response.url)
          navigate('/login')
        }
        // response.json()
        //   .then(data =>{
        //       console.log(data);
        //       setIsAuthenticated(false);
        //       window.location.replace
        //       navigate('/login');
        //   })
      })

  };



  return (
    <button onClick={logoutUser} className="logout-btn">Logout</button>
  );
};

export default Logout;
