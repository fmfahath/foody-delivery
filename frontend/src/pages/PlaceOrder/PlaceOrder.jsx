import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

    const { getCartTotal, token, food_list, cartItems, backend_url } = useContext(StoreContext)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });



    return (
        <form className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" placeholder='First Name' />
                    <input type="text" placeholder='Last Name' />
                </div>
                <input type="email" placeholder='Email Address' />
                <input type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input type="text" placeholder='City' />
                    <input type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input type="text" placeholder='Zip Code' />
                    <input type="text" placeholder='Country' />
                </div>
                <input type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-toal-details">
                            <p>Subtotal</p>
                            <p>${getCartTotal()}</p>
                        </div>
                        <hr />
                        <div className="cart-toal-details">
                            <p>Delivery Fee</p>
                            <p>${getCartTotal() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-toal-details">
                            <p>Total</p>
                            <p>${getCartTotal() === 0 ? 0 : getCartTotal() + 2}</p>
                        </div>
                    </div>
                    <button>PROCEED TO PAY</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder