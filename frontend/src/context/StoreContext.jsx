import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const [cartItems, setCartItem] = useState({})

    //add cart items
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {

            setCartItem({ ...cartItems, [itemId]: 1 })
        }
        else {
            setCartItem({ ...cartItems, [itemId]: cartItems[itemId] + 1 })
        }
    }

    //remove items from cart
    const removecart = (itemId) => {
        setCartItem({ ...cartItems, [itemId]: cartItems[itemId] - 1 })
    }

    //cart total amount
    const getCartTotal = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const food = food_list.find((food) => food._id === item)
                totalAmount += food.price * cartItems[item]
            }
        }
        return totalAmount;
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItem,
        addToCart,
        removecart,
        getCartTotal
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;