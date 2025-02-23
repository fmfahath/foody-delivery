import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';


const Orders = () => {

    const url = import.meta.env.VITE_BACKEND_URL;
    const [orders, setOrders] = useState()

    const fetchOrders = async () => {
        try {
            const responseData = await axios.get(`${url}/api/order/list`)
            setOrders(responseData.data.data)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const statusHandler = async (event, orderId) => {
        try {
            const responseData = await axios.post(`${url}/api/order/status`, { orderId, status: event.target.value })
            if (responseData.data.success) {
                await fetchOrders()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])


    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders && orders.map((order, index) => {
                    return (
                        <div key={index} className="order-item">
                            <img src={assets.parcel_icon} alt="" />
                            <div>
                                <p className='order-item-food'>{order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity
                                    }
                                    else {
                                        return item.name + " x " + item.quantity + ","
                                    }
                                })}</p>
                                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                                <div className='order-item-address'>
                                    <p>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}, {order.address.country}, </p>
                                    <p></p>
                                </div>
                                <p className='order-item-phone'>{order.address.phone}</p>
                            </div>
                            <p>{order.items.length}</p>
                            <p>${order.amount}</p>
                            <select name="status" id="" onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                                <option value="food Processing">Processing</option>
                                <option value="out for Delivery">Out for Delivery</option>
                                <option value="delivered">Delived</option>
                            </select>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Orders