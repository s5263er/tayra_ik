// PrivateRoute.js
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, allowedRoles }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user has a valid JWT token and the required role
    const jwtToken = localStorage.getItem('jwtToken');
    const userRole = localStorage.getItem('userRole');
    console.log(jwtToken)
    console.log(userRole)



    if (jwtToken && userRole && allowedRoles.includes(userRole)) {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, [allowedRoles]);

  if (isLoading) {
    // You might want to render a loading spinner or message here
    return null;
  }

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated or authorized
    return <Navigate to="/" />;
  }

  // Render the protected route
  return element;
};

export default PrivateRoute;
