import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {


    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "salad"
    });


    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData({ ...data, [name]: value })
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const url = import.meta.env.VITE_BACKEND_URL;

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', Number(data.price))
        formData.append('category', data.category)
        formData.append('image', image);

        try {
            const responseData = await axios.post(`${url}/api/food/add`, formData)

            if (responseData.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "salad"
                })

                setImage(false)
                toast.success(responseData.data.message)
            } else {
                toast.error(responseData.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input type="text" name='name' placeholder='Type here' onChange={onChangeHandler} value={data.name} />
                </div>
                <div className="add-product-description flex-col">
                    <p>product description</p>
                    <textarea name="description" rows='6' placeholder='Write product description' onChange={onChangeHandler} value={data.description}></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category">
                        <p>Product Category</p>
                        <select name="category" onChange={onChangeHandler}>
                            <option value="salad">Salad</option>
                            <option value="rolls">Rolls</option>
                            <option value="deserts">Deserts</option>
                            <option value="sandwich">Sandwich</option>
                            <option value="cake">Cake</option>
                            <option value="pure veg">Pure Veg</option>
                            <option value="pasta">Pasta</option>
                            <option value="noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price">
                        <p>Product Price</p>
                        <input type="number" name='price' placeholder='$20' onChange={onChangeHandler} value={data.price} />
                    </div>
                </div>
                <button className='add-btn' type='submit'>Add</button>
            </form>
        </div>
    )
}

export default Add