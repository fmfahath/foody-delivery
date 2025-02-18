import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({ setShowLogin }) => {

    const [currentSate, setCurrentState] = useState('Sign Up')

    return (
        <div className='login-popup'>
            <form className="login-popup-container">
                <div className='login-popup-title'>
                    <h2>{currentSate}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentSate === 'Sign Up' && <input type="text" placeholder='Your Name' required />}
                    <input type="email" placeholder='Your Email' required />
                    <input type="password" placeholder='Password' required />
                </div>
                <button>{currentSate === 'Sign Up' ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currentSate === 'Sign Up' ? <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
                    : <p>Craete a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup