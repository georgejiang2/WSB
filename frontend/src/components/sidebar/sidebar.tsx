// frontend/src/components/sidebar/sidebar.tsx
import React, { useState, useEffect } from 'react';
import './sidebar.css';
import wsbLogo from '../../assets/WSB.png';
import { pageTopPosts, pageWsbChatbot, pageTrading } from '../../router/Router';

interface SidebarProps {
  onToggle: (state: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    onToggle?.(newState);
  };

  useEffect(() => {
    onToggle?.(isSidebarOpen);
  }, [isSidebarOpen, onToggle]);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <a href="/">
        <div className="sidebar-header">
          <img src={wsbLogo} alt="wsb logo" />
        </div>
      </a>
      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <a href={pageTopPosts}>
            <li
              className={`sidebar-item ${activeItem === 'trending' ? 'active' : ''}`}
              onClick={() => handleItemClick('trending')}
            >
              <span className="sidebar-icon">🚀</span>
              {isSidebarOpen && <span className="sidebar-label">Trending</span>}
            </li>
          </a>
          <a href={pageWsbChatbot}>
            <li
              className={`sidebar-item ${activeItem === 'chatbot' ? 'active' : ''}`}
              onClick={() => handleItemClick('chatbot')}
            >
              <span className="sidebar-icon">🤖</span>
              {isSidebarOpen && <span className="sidebar-label">WSB Chatbot</span>}
            </li>
          </a>
          <a href={pageTrading}>
            <li
              className={`sidebar-item ${activeItem === 'simulation' ? 'active' : ''}`}
              onClick={() => handleItemClick('simulation')}
            >
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
  );
};

export default Sidebar;
