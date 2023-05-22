import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const UserProtectedRoute = (props) => {
  // const isAuthenticated = localStorage.getItem('access_token');

  if (!props.isAuthenticated) {
    return <Navigate to="/" />;
  }
  return props.children

  // return <Outlet />;
};

export default UserProtectedRoute;
