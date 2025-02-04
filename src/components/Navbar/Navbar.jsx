import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='nav'>
      <Link to="/">
        <div className='logo'>
          <img className='logo_img' src={assets.testline} alt="" />
        </div>
      </Link>
      <div className='title'>
        <Link to="/leader-board">
          <ul>
            <li>Leaderboard</li>
          </ul>
        </Link>
      </div>
    </div>
  )
}

export default Navbar