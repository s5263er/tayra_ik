// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="toggle-btn">☰</button>
      </div>
      <div className="sidebar-links">
        <Link to="/hr-home">Ana Sayfa</Link>
        <Link to="/hr-home/leaverequests">İzin İstekleri</Link>
        <Link to="/hr-home/employees">Çalışanlar</Link>
        <Link to="/hr-home/reports">Raporlar</Link>
        <Link to="/hr-home/edit">Çalışan Düzenle</Link>
        <Link to="/hr-home/add">Çalışan Ekle</Link>
        <Link to="/hr-home/settings">Ayarlar</Link>
      </div>
    </div>
  );
};

export default Sidebar;
