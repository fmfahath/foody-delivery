import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify'

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {

    const [cartItems, setCartItem] = useState({})
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const admin_url = import.meta.env.VITE_ADMIN_URL;
    const blob_storage_url = import.meta.env.BLOB_STORAGE_URL
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])
    const [currentSate, setCurrentState] = useState('Login')
    const [adminState, setAdminState] = useState(false)
    const [userData, setUserData] = useState({})

    //add cart items
    const addToCart = async (itemId) => {
        try {
            if (!cartItems[itemId]) {
                setCartItem({ ...cartItems, [itemId]: 1 })
            }
            else {
                setCartItem({ ...cartItems, [itemId]: cartItems[itemId] + 1 })
            }

            if (token) {
                await axios.post(`${backend_url}/api/cart/add`, { itemId }, { headers: { token } })
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //remove items from cart
    const removecart = async (itemId) => {
        try {
            setCartItem({ ...cartItems, [itemId]: cartItems[itemId] - 1 })

            if (token) {
                await axios.post(`${backend_url}/api/cart/remove`, { itemId }, { headers: { token } })
            }
        } catch (error) {
            toast.error(error.message)
        }
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

    //get food list
    const fetchFoodList = async () => {
        const responseData = await axios.get(`${backend_url}/api/food/list`)
        setFoodList(responseData.data.data)
    }

    //get cart data
    const getCartData = async (token) => {
        try {
            const responseData = await axios.post(`${backend_url}/api/cart/get`, {}, { headers: { token } })
            setCartItem(responseData.data.cartData)
        } catch (error) {
            toast.error(error.message)
        }
    }

    //get user data
    const getUserData = async (token) => {
        try {
            const responseData = await axios.post(`${backend_url}/api/user/get`, {}, { headers: { token } })
            if (responseData.data.success) {
                setUserData(responseData.data.userData)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList()

            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'))

                await getCartData(localStorage.getItem('token'))
                await getUserData(localStorage.getItem('token'))
            }
        }

        loadData();

    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItem,
        addToCart,
        removecart,
        getCartTotal,
        backend_url,
        admin_url,
        blob_storage_url,
        token,
        setToken,
        currentSate,
        setCurrentState,
        adminState,
        setAdminState,
        userData,
        setUserData
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;