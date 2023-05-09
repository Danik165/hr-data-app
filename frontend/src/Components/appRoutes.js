import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import UserDashboard from './Components/UserDashboard';
import AdminDashboard from './Components/AdminDashboard';

const AppRoutes = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/" component={UserDashboard} /> //User path
      <Route path="/Admin" component={AdminDashboard} />
    </Switch>
  </Router>
);

export default AppRoutes;
