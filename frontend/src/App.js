import React, { useState, useEffect } from 'react';
import Login from './Components/login/Login';
//import Register from './Components/admin/Register';
import UserDashboard from './Components/users/UserDashboard';
import AdminDashboard from './Components/admin/AdminDashboard';
import Profile from './Components/users/Profile';
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
          <Route exact path="/" element={
                                            <UserProtectedRoute isAuthenticated={isAuthenticated}>
                                              <UserDashboard setIsAuthenticated={setIsAuthenticated}/>
                                            </UserProtectedRoute>
                                          } />
          <Route exact path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/profile" element={
                                    <UserProtectedRoute isAuthenticated={isAuthenticated}>
                                      <Profile /> {/* Render Profile component here */}
                                    </UserProtectedRoute>
                                  } />          <Route path="/admin/*" element={
                                            <UserProtectedRoute isAuthenticated={isAuthenticated}>
                                              <AdminDashboard setIsAuthenticated={setIsAuthenticated}/>
                                            </UserProtectedRoute>
                                          } />
        </Routes>
      </BrowserRouter>
    </div>
    
  )
};

export default App;
