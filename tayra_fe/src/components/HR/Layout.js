// Layout.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/tr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './HR_Home.css';

moment.locale('tr');

const localizer = momentLocalizer(moment);

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-layout">
      <div className="app-bar">
          
        <h1 className="app-title">İnsan Kaynakları Ana Sayfa</h1>
      </div>
      <div className="content-layout">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
