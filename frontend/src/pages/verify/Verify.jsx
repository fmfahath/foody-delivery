import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {


    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { backend_url, token } = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyPayment = async () => {
        try {
            const responseData = await axios.post(`${backend_url}/api/order/verify`, { success, orderId })
            if (responseData.data.success) {
                navigate('/myorders')
            }
            else {
                navigate('/')
            }
        } catch (error) {
            console.log("verifyPayment Error: ", error.message);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])

    return (
        <div className='verify'>
            <div className="spinner">

            </div>
        </div>
    )
}

export default Verify