// frontend/src/components/topposts/topposts.tsx
import React, { useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import './topposts.css';

const TopPosts: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <>
      <Sidebar onToggle={handleSidebarToggle} />
      <div className={`topposts-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <h1>Top Posts</h1>
        <p>Content for top posts...</p>
      </div>
    </>
  );
};

export default TopPosts;
