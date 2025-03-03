import React, { Fragment, useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const { food_list, cartItems, removecart, getCartTotal, backend_url, blob_storage_url } = useContext(StoreContext)
    const navigate = useNavigate()

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p >Items</p>
                    <p >Price</p>
                    <p >Quantity</p>
                    <p >Total</p>
                    <p >Remove</p>
                    <p >Title</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {

                        return (
                            <Fragment key={index}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={`${blob_storage_url}/${item.image}`} alt={item.title} />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price * cartItems[item._id]}</p>
                                    <p className='cross' onClick={() => removecart(item._id)}>X</p>
                                </div>
                                <hr />
                            </Fragment>
                        )
                    }
                })}
            </div>
            <div className="cart-bottom">
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
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, enter it here</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='promo Code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart