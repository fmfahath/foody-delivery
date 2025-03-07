import express from 'express'
import { getUserData, loginUser, registerUser } from '../controllers/userController.js'
import authMiddleware from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/get', authMiddleware, getUserData)

export default userRouter;