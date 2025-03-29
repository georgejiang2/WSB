import { useState } from 'react'
import wsbLogo from '../../assets/WSB.png'
import downArrow from '../../assets/down.png'
import './home.css'

export const Home = () => {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <div className="top">
        <a href="https://www.reddit.com/r/wallstreetbets/" target="blank">
          <img src={wsbLogo} className="logo" alt="WSB logo" style={{ width: '20rem', height: 'auto' }} />
        </a>
        <h1> HackPSU 2025 r/wallstreetbets Analyst</h1>
        <img src={downArrow} className="down" alt="down arrow" />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
};

export default Home
