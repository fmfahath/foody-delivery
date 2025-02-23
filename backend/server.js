import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cardRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'



//app config
const app = express()
const port = process.env.PORT || 4000

//middleware 
app.use(express.json())
app.use(cors())

//connect Database
connectDB()

//end-points
app.use('/api/images', express.static('uploads'))
app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cardRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send('Node Runnning..')
})




app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


