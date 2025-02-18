import React, { useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets.js'

const Navbar = () => {

    const [menu, setMenu] = useState('home')

    return (
        <div className='navbar'>
            <img src={assets.logo} alt="logo" className='logo' />
            <ul className="navbar-menu">
                <li onClick={() => setMenu("home")} className={menu === 'home' ? 'active' : ''}>Home</li>
                <li onClick={() => setMenu("menu")} className={menu === 'menu' ? 'active' : ''}>Menu</li>
                <li onClick={() => setMenu("mobile")} className={menu === 'mobile' ? 'active' : ''}>Mobile App</li>
                <li onClick={() => setMenu("contact")} className={menu === 'contact' ? 'active' : ''}>Contact</li>
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