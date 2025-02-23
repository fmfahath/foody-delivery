import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState('home')
    const { getCartTotal, token, setToken } = useContext(StoreContext)
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        setToken("")
        navigate('/')
    }

    return (
        <div className='navbar'>
            <Link to={'/'}> <img src={assets.logo} alt="logo" className='logo' /></Link>
            <ul className="navbar-menu">
                <Link to={'/'} onClick={() => setMenu("home")} className={menu === 'home' ? 'active' : ''}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === 'menu' ? 'active' : ''}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile")} className={menu === 'mobile' ? 'active' : ''}>Mobile App</a>
                <a href='#footer' onClick={() => setMenu("contact")} className={menu === 'contact' ? 'active' : ''}>Contact</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search-icon" />
                <div className="navbar-search-icon">
                    <Link to={'/cart'}><img src={assets.basket_icon} alt='basket-icon' /></Link>
                    <div className={getCartTotal() > 0 ? "dot" : ""}></div>
                </div>
                {!token ?
                    <button onClick={() => setShowLogin(true)}>Sign in</button>
                    :
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li><Link to={'/myorders'}><img src={assets.bag_icon} /><p>Orders</p></Link></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} /><p>Logout</p></li>
                        </ul>
                    </div>
                }
            </div>
        </div >
    )
}

export default Navbar