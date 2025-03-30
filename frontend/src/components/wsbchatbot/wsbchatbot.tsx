import React, { useState } from 'react';
import './wsbchatbot.css';
import char from '../../assets/aigirl.jpg';
import char2 from '../../assets/wojak.jpg';
import Sidebar from '../sidebar/sidebar';

export const WsbChatbot = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <>  
      <div className="page-container">
        <div>
          <Sidebar onToggle={handleSidebarToggle} />
        </div>
        <div className={`chat-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="chat-box">
            <div className="chat-window">
              <div className="aiman">
                <div className="image-container" />
                <p>A personalized WSB AI companion to chat with!</p>
              </div>
              <div className="messages">
                <div className="avatar-container user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <span className="username">User</span>
                  <img src={char2} alt="User Avatar" className="avatar" style={{ width: '3rem', height: 'auto', borderRadius: '50%', objectFit: 'cover', marginLeft: '10px'}} />
                </div>
                <div className="message user-message">
                  <div className="message-content">
                    <p>What's the next big stock pick?</p>
                  </div>
                </div>
                <div className="avatar-container bot-avatar" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={char} alt="WSB AI Avatar" className="avatar" style={{ width: '3rem', height: 'auto', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }} />
                  <span className="username">WSB AI</span>
                </div>
                <div className="message bot-message">
                  <div className="message-content">
                    <p>$GME 🚀🚀🚀 To the moon! 🌕</p>
                  </div>
                </div>
              </div>
            </div>
            <input type="text" className="chat-input" placeholder="Type your message..." />
          </div>
        </div>
      </div>
    </>
  );
};

export default WsbChatbot;