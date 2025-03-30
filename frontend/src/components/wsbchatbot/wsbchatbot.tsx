import React from 'react';
import './wsbchatbot.css';
import char from '../../assets/aigirl.jpg';
import char2 from '../../assets/wojak.jpg';
import Sidebar from '../sidebar/sidebar';

export const WsbChatbot = () => {
  return (
    <>  <div class="sidechat">
        <div><Sidebar /></div>
        <div class="chat-container">
            <div class="chat-box">
                <div class="chat-window">
                    <div className="aiman">
                        <div className="image-container" />
                        <p>A personalized WSB AI companion to chat with!</p>
                    </div>
                    <div class="messages">
                        <div class="avatar-container user-avatar"  style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <span className="username">User</span>
                            <img src={char2} alt="User Avatar" class="avatar" style = {{ width: '3rem', height: 'auto', borderRadius: '50%', objectFit: 'cover', marginLeft: '10px'}} />
                        </div>
                        <div class="message user-message">
                            <div class="message-content">
                                <p>What's the next big stock pick?</p>
                            </div>
                        </div>
                        <div class="avatar-container bot-avatar" style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={char} alt="WSB AI Avatar" class="avatar" style={{ width: '3rem', height: 'auto', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }} />
                            <span class="username">WSB AI</span>
                        </div>
                        <div class="message bot-message">
                            <div class="message-content">
                                <p>$GME 🚀🚀🚀 To the moon! 🌕</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <input type="text" class="chat-input" placeholder="Type your message..." />
            </div>
        </div>
        </div>
    </>
  );
};

export default WsbChatbot;
