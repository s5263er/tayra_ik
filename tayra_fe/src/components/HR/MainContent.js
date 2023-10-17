// MainContent.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HR_Home from './HR_Home';
import Add_Worker from './Add_Worker';

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="app-bar">
        <h1 className="app-title">İnsan Kaynakları Ana Sayfa</h1>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<HR_Home />} />
          <Route path="add" element={<Add_Worker />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainContent;
