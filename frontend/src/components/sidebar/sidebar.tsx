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
            <a href="/top-posts">
                <li className="sidebar-item active">
                    <span className="sidebar-icon">🚀</span>
                    {isSidebarOpen && <span className="sidebar-label">Trending</span>}
                </li>
            </a>
            <a href="/wsb-chatbot">
                <li className="sidebar-item">
                    <span className="sidebar-icon">🤖</span>
                    {isSidebarOpen && <span className="sidebar-label">WSB Chatbot</span>}
                </li>
            </a>
            <a href="/top-posts">
                <li className="sidebar-item">
                    <span className="sidebar-icon">📈</span>
                    {isSidebarOpen && <span className="sidebar-label">Simulation</span>}
                </li>
            </a>
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