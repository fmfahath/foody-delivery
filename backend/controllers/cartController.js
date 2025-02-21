import userModel from "../models/userModel.js";

//add to cart------------------------------------------------------
export const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId })
        let cartData = userData.cartData

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Added to cart" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

//remove from cart------------------------------------------------------
export const removeFromCart = async (req, res) => {

}

//fetch user cart data------------------------------------------------------
export const getCart = async (req, res) => {

}