import React, { useState } from 'react';
import './sidebar.css';
import wsbLogo from '../../assets/WSB.png'
import Graph from '../graphs/Graph.tsx'

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <img src={wsbLogo} alt="wsb logo" />
        </div>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            <li className="sidebar-item active">
              <span className="sidebar-icon">🚀</span>
              {isSidebarOpen && <span className="sidebar-label">Dashboard</span>}
            </li>
            <li className="sidebar-item">
              <span className="sidebar-icon">📈</span>
              {isSidebarOpen && <span className="sidebar-label">Trending</span>}
            </li>
            <li className="sidebar-item">
              <span className="sidebar-icon">💎</span>
              {isSidebarOpen && <span className="sidebar-label">Diamond Hands</span>}
            </li>
            <li className="sidebar-item">
              <span className="sidebar-icon">🦍</span>
              {isSidebarOpen && <span className="sidebar-label">Ape Together</span>}
            </li>
            <li className="sidebar-item">
              <span className="sidebar-icon">💰</span>
              {isSidebarOpen && <span className="sidebar-label">YOLO Plays</span>}
            </li>
          </ul>
        </div>

        <div className="sidebar-toggle-container">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
