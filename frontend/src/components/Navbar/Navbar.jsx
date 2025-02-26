import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState('home')
    const { getCartTotal, token, setToken, adminState, setAdminState, userData } = useContext(StoreContext)
    const navigate = useNavigate()
    const admin_url = 'http://localhost:5174';

    const adminHandler = () => {
        window.location.replace(admin_url);
    }

    const logout = () => {
        localStorage.removeItem('token')
        setAdminState(false)
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
                <Link><img src={assets.search_icon} alt="search-icon" /></Link>
                <div className="navbar-search-icon">
                    <Link to={'/cart'}><img src={assets.basket_icon} alt='basket-icon' /></Link>
                    <div className={getCartTotal() > 0 ? "dot" : ""}></div>
                </div>
                {!token ?
                    <button onClick={() => setShowLogin(true)}>Sign in</button>
                    :
                    <div className='navbar-profile'>
                        <span>{userData && userData.name} <img src={assets.profile_icon} alt="" /></span>
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} /><p>Orders</p></li>
                            <hr />
                            {adminState &&
                                <>
                                    <li onClick={() => adminHandler()}><img src={assets.bag_icon} /><p>Admin</p></li>
                                    <hr />
                                </>
                            }
                            <li onClick={logout}><img src={assets.logout_icon} /><p>Logout</p></li>
                        </ul>
                    </div>
                }
            </div>
        </div >
    )
}

export default Navbar