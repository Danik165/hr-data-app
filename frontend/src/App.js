import React, { useState} from 'react';
import Login from './Components/login/Login';
import UserDashboard from './Components/users/UserDashboard';
import AdminDashboard from './Components/admin/AdminDashboard';
import EnterEmail from './Components/login/EnterEmail';
import EnterNewPassword from './Components/login/EnterNewPassword';
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
          <Route exact path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />

         <Route path="/admin/*" element={
                                            <UserProtectedRoute isAuthenticated={isAuthenticated}>
                                              <AdminDashboard setIsAuthenticated={setIsAuthenticated}/>
                                            </UserProtectedRoute>
                                          }     />
        <Route exact path='/forgotpassword' element={<EnterEmail />} />
        <Route path='/newpassword/*' element={<EnterNewPassword />} />
         <Route  path="/*" element={
                                            <UserProtectedRoute isAuthenticated={isAuthenticated}>
                                              <UserDashboard setIsAuthenticated={setIsAuthenticated}/>
                                            </UserProtectedRoute>
                                          } />
        </Routes>
      </BrowserRouter>
    </div>
    
  )
};

export default App;
