import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets'

const Add = () => {
    return (
        <div className='add'>
            <form className='flex-col'>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={assets.upload_area} alt="" />
                    </label>
                    <input type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input type="text" name='name' placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>product description</p>
                    <textarea name="description" rows='6' placeholder='Write product description'></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category">
                        <p>Product Category</p>
                        <select name="category" >
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
                        <input type="number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button className='add-btn' type='submit'>Add</button>
            </form>
        </div>
    )
}

export default Add