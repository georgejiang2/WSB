import { useState, useEffect } from 'react';
import './Navbar.css';
import wsbLogo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { topPosts, wsbChatbot, trading } from '../../router/pages';

const Navbar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const scrollThreshold = 100;

    const navigate = useNavigate()
    const handleClick = (url: string) => {
        navigate(url)
    }
    return (
        <div style = {{backgroundColor:  scrollPosition > scrollThreshold ? 'black' : 'transparent', transition: 'background-color 0.5s linear'}} className = 'navbar'>
            <a href="/"><img src = {wsbLogo} alt = "" className='logo' /></a>
            <ul>
                <li onClick={() => handleClick(topPosts)}>Top Posts</li>
                <li onClick={() => handleClick(wsbChatbot)}>WSB Chatbot</li>
                <li onClick={() => handleClick(trading)}>Trading Simulation</li>
            </ul>
        </div>
    )
}

export default Navbar;
