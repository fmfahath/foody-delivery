import React from 'react'
import './navbar.css'
import { assets } from '../../assets/assets.js'

const Navbar = () => {
    return (
        <div className='navbar'>
            <img src={assets.logo} alt="logo" className='logo' />
            <ul className="navbar-menu">
                <li>Home</li>
                <li>Menu</li>
                <li>Mobile App</li>
                <li>Contact</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search-icon" />
                <div className="navbar-search-icon">
                    <img src={assets.basket_icon} alt='basket-icon' />
                    <div className="dot"></div>
                </div>
                <button>Sign in</button>
            </div>
        </div>
    )
}

export default Navbar