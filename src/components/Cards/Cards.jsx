import React from 'react'
import './cards.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'


const Cards = () => {
  return (
    <div className='card'>
        <div className='card_test'>
            <div className='test'>
                <img src={assets.Demo} alt="" />
                <h5>Demo Test</h5>
                <Link to="/guide"><p>Click here</p></Link>
            </div>
        </div>
    </div>
  )
}

export default Cards