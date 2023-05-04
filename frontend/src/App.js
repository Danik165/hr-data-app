import React, { useState, useEffect } from 'react';
import Login from './Components/login/Login';
//import Register from './Components/admin/Register';
import UserDashboard from './Components/users/UserDashboard';
import AdminDashboard from './Components/admin/AdminDashboard';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import UserProtectedRoute from './Components/ProtectedRoute';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [page, setPage] = useState('login');
  

  return(
    
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route exact path="/user" element={
                                          <UserProtectedRoute isAuthenticated={isAuthenticated}>
                                            <UserDashboard />
                                          </UserProtectedRoute>
                                        } />
      </Routes>


    </BrowserRouter>
    
  )
};

export default App;
