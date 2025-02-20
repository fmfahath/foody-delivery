import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

    const url = import.meta.env.VITE_BACKEND_URL;
    const [list, setList] = useState([])

    const fetchList = async () => {
        try {
            const responseData = await axios.get(`${url}/api/food/list`)

            if (responseData.data.success) {
                setList(responseData.data.data)
            }
            else {
                toast.error(responseData.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const removeFood = async (foodId) => {
        try {
            const responseData = await axios.post(`${url}/api/food/remove`, { id: foodId })

            if (responseData.data.success) {
                fetchList();
                toast.success(responseData.data.message)
            }
            else {
                toast.error(responseData.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div className='list add flex-col'>
            <p>All Food List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div className='list-table-format' key={index}>
                            <img src={`${url}/api/images/${item.image}`} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p className='cursor' onClick={() => removeFood(item._id)}>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List