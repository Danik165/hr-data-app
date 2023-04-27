import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const history = useHistory();
    const isAuthenticated = localStorage.getItem('access_token');

    useEffect(() => {
      if (!isAuthenticated) {
        history.push('/login');
      }
    }, [isAuthenticated, history]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
