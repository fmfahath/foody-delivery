import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Order Your Favorite Food Here</h2>
                <p>Crave. Click. Enjoy. From our kitchen to your doorstep, Delicious meals delivered fast and fresh. Satisfy your cravings with just a tap!</p>
                <a href='#food-display'>Order Now</a>
            </div>
        </div>
    )
}

export default Header