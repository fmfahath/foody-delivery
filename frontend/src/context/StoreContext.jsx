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

    const contextValue = {
        food_list,
        cartItems,
        setCartItem,
        addToCart,
        removecart
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;