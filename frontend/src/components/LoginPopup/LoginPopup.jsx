import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets.js'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const { backend_url, setToken } = useContext(StoreContext)
    const [currentSate, setCurrentState] = useState('Sign Up')
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })


    const onChangehandler = (e) => {
        const name = e.target.name
        const value = e.target.value

        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault();

        let newUrl = backend_url;

        if (currentSate === 'Sign Up') {
            newUrl += '/api/user/register'
        }
        else {
            newUrl += '/api/user/login'
        }

        try {
            const responseData = await axios.post(newUrl, data)

            if (responseData.data.success) {
                setToken(responseData.data.token)
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
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={onLogin}>
                <div className='login-popup-title'>
                    <h2>{currentSate}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentSate === 'Sign Up' &&
                        <input type="text" placeholder='Your Name' required name='name' onChange={onChangehandler} value={data.name} />}
                    <input type="email" placeholder='Your Email' required name='email' onChange={onChangehandler} value={data.email} />
                    <input type="password" placeholder='Password' required name='password' onChange={onChangehandler} value={data.password} />
                </div>
                <button type='submit'>{currentSate === 'Sign Up' ? "Create Account" : "Login"}</button>
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