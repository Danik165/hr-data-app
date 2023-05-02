import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UserProtectedRoute = (props) => {
  // const isAuthenticated = localStorage.getItem('access_token');
  const isAuthenticated = props.isAuthenticated;
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return props.children

  // return <Outlet />;
};

export default UserProtectedRoute;
