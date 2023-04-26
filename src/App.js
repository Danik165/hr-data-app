import React, { useState, useEffect } from 'react';
import Login from './Components/Login';
import Register from './Components/Register';
import UserDashboard from './Components/UserDashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState('login'); // Default page is login

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <Login setPage={setPage} setIsAuthenticated={setIsAuthenticated} />;
      case 'register':
        return <Register setPage={setPage} />;
      case 'dashboard':
        return isAuthenticated ? (
          <UserDashboard setIsAuthenticated={setIsAuthenticated} />
        ) : (
          setPage('login')
        );
      default:
        return <Login setPage={setPage} setIsAuthenticated={setIsAuthenticated} />;
    }
  };

  return <>{renderPage()}</>;
};

export default App;
