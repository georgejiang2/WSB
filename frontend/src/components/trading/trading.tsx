import React, { useState } from 'react';
import './trading.css';
import Sidebar from '../sidebar/sidebar';
import Graph from '../graphs/Graph';

export const Trading = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const handleSidebarToggle = (isOpen: boolean | ((prevState: boolean) => boolean)) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <>
      {/* Pass the onToggle function to Sidebar */}
      <div>
        <Sidebar onToggle={handleSidebarToggle} />
      </div>
      <div className={`chat-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Graph />
      </div>
    </>
  );
};

export default Trading;
