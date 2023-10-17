import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import HR_Home from './components/HR/HR_Home';
import Add_Worker from './components/HR/Add_Worker';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/hr-home/*"
          element={
            <PrivateRoute
              element={<HR_Home />}
              allowedRoles={['HR']} // Add the roles allowed for this route
            />
          }
        />
        <Route
          path="/hr-home/add"
          element={
            <PrivateRoute
              element={<Add_Worker />}
              allowedRoles={['HR']} // Add the roles allowed for this route
            />
          }
        />
        {/* Add other routes */}
      </Routes>
    </Router>
  );
};

export default App;
