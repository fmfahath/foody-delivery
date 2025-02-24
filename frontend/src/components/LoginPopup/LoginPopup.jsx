import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets.js'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin, showLogin }) => {

    const { backend_url, setToken, currentSate, setCurrentState, setAdminState, setUserData } = useContext(StoreContext)
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const setShowLoginState = () => {
        setShowLogin(false)
    }


    const onChangehandler = (e) => {
        const name = e.target.name
        const value = e.target.value

        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault();

        let newUrl = backend_url;

        if (currentSate === 'Login') {
            newUrl += '/api/user/login'
        }
        else {
            newUrl += '/api/user/register'
        }

        try {
            const responseData = await axios.post(newUrl, data)

            if (responseData.data.success) {

                if (responseData.data.admin) {
                    setAdminState(true)
                }

                setToken(responseData.data.token)
                setUserData(responseData.data.userData)
                localStorage.setItem('token', responseData.data.token)
                setShowLogin(false)

            } else {
                toast.error(responseData.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }



    return (
        <div className='login-popup admin'>
            <form className="login-popup-container" onSubmit={onLogin}>
                <div className='login-popup-title'>
                    <h2>{currentSate}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLoginState()} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentSate === 'Sign Up' && <input type="text" placeholder='Your Name' required name='name' onChange={onChangehandler} value={data.name} />}
                    <input type="email" placeholder='Your Email' required name='email' onChange={onChangehandler} value={data.email} />
                    <input type="password" placeholder='Password' required name='password' onChange={onChangehandler} value={data.password} />
                </div>
                <button type='submit'>{currentSate === 'Sign Up' ? "Create Account" : "Login"}</button>
                {currentSate === 'Sign Up' &&
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use & privacy policy</p>
                    </div>
                }

                {currentSate === 'Sign Up' ? <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
                    : <p>Craete a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup