// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Add other routes */}
      </Routes>
    </Router>
  );
};

export default App;
