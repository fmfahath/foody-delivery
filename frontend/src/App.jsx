import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { ToastContainer } from 'react-toastify';
import Verify from './pages/verify/Verify'
import MyOrders from './pages/my orders/MyOrders'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  console.log("app: ", showLogin);

  useEffect(() => {
    if (showLogin) {
      document.body.classList.add('disable-scroll');
    } else {
      document.body.classList.remove('disable-scroll');
    }
  }, [showLogin])

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} showLogin={showLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App