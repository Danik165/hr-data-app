import React, { useState, useEffect } from 'react';
import Login from './Components/login/Login';
//import Register from './Components/admin/Register';
import UserDashboard from './Components/users/UserDashboard';
import AdminDashboard from './Components/admin/AdminDashboard';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import UserProtectedRoute from './Components/ProtectedRoute';

import './App.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [page, setPage] = useState('login');
  

  return(
    <div className='App'>
      
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
    </div>
    
  )
};

export default App;
