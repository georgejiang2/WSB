// frontend/src/components/trading/trading.tsx
import React, { useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import Graph from '../graphs/Graph';
import './trading.css';

const Trading: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <>
      <Sidebar onToggle={handleSidebarToggle} />
      <div className={`trading-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Graph />
      </div>
    </>
  );
};

export default Trading;
