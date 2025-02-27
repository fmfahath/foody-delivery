import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const frontend_url = import.meta.env.VITE_FRONTEND_URL;

    const homePageHandler = () => {
        window.location.replace(frontend_url);
    }

    return (
        <div className='navbar'>
            <img className='logo' src={assets.logo} alt="" />
            <div className='left-div'>
                <p onClick={() => homePageHandler()}>Home Page</p>
                <img className='profile' src={assets.profile_image} alt="" />
            </div>
        </div>
    )
}

export default Navbar