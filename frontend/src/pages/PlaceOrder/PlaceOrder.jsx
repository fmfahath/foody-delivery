import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

    const delivery_fee = 2;
    const navigate = useNavigate()
    const { getCartTotal, token, food_list, cartItems, backend_url } = useContext(StoreContext)
    const [data, setData] = useState({
        firstName: "fahath",
        lastName: "mohamed",
        email: "test@gmail.com",
        street: "main",
        city: "chennai",
        state: "tamilnadu",
        zipcode: "4500",
        country: "india",
        phone: "045666754",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }

    const placeOrder = async (e) => {
        e.preventDefault();

        let orderItems = []
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo['quantity'] = cartItems[item._id];
                // itemInfo.quantity = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })

        let orderData = {
            address: data,
            items: orderItems,
            amount: getCartTotal() + delivery_fee
        }

        try {
            const responseData = await axios.post(`${backend_url}/api/order/place`, orderData, { headers: { token } })
            if (responseData.data.success) {
                const { session_url } = responseData.data
                window.location.replace(session_url)
            }
            else {
                console.log("placeOrder response error: ", responseData.data);
                toast.error(responseData.data.message)
            }
        } catch (error) {
            console.log("placeOrder  error: ", error.message);
            toast.error(error.message)
        }

    }

    useEffect(() => {
        if (!token) {
            navigate('/cart')
            toast.warning("Login to proceed payment")
        }
        else if (getCartTotal() === 0) {
            navigate('/cart')
            toast.warning("Select any food items to proceed payment")
        }
    }, [token])

    return (
        <form className='place-order' onSubmit={placeOrder}>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-fields">
                    <input required type="text" placeholder='First Name' name='firstName' onChange={onChangeHandler} value={data.firstName} />
                    <input required type="text" placeholder='Last Name' name='lastName' onChange={onChangeHandler} value={data.lastName} />
                </div>
                <input required type="email" placeholder='Email Address' name='email' onChange={onChangeHandler} value={data.email} />
                <input required type="text" placeholder='Street' name='street' onChange={onChangeHandler} value={data.street} />
                <div className="multi-fields">
                    <input required type="text" placeholder='City' name='city' onChange={onChangeHandler} value={data.city} />
                    <input required type="text" placeholder='State' name='state' onChange={onChangeHandler} value={data.state} />
                </div>
                <div className="multi-fields">
                    <input required type="text" placeholder='Zip Code' name='zipcode' onChange={onChangeHandler} value={data.zipcode} />
                    <input required type="text" placeholder='Country' name='country' onChange={onChangeHandler} value={data.country} />
                </div>
                <input required type="text" placeholder='Phone' name='phone' onChange={onChangeHandler} value={data.phone} />
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
                    <button type='submit'>PROCEED TO PAY</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder