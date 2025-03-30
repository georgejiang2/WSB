import React, { useState } from 'react';
import './trading.css';
import Sidebar from '../sidebar/sidebar';
import Graph from '../graphs/Graph';

export const Trading = () => {
  // State to manage the sidebar's open/closed state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Function to toggle the sidebar state
  const handleSidebarToggle = (newState: boolean) => {
    setSidebarOpen(newState);
  };

  return (
    <>
      {/* Pass the onToggle function to Sidebar */}
      <div>
        <Sidebar onToggle={handleSidebarToggle} />
      </div>
      <div>
        <Graph />
      </div>
    </>
  );
};

export default Trading;
