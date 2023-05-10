import React from 'react';
import { useNavigate } from 'react-router';


const Logout = ({ setIsAuthenticated }) => {  // destructuring props to get setIsAuthenticated
  let navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem('access_token');

    setIsAuthenticated(false);

    navigate('/');
  };

  return (
    <button onClick={logoutUser} className="logout-btn">Logout</button>
  );
};

export default Logout;
