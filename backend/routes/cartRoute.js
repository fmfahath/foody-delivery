import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController";
const cardRouter = express.Router();

cardRouter.post('/add', addToCart)
cardRouter.post('/remove', removeFromCart)
cardRouter.post('/get', getCart)

export default cardRouter;