import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'



//app config
const app = express()
const port = 4000

//middleware 
app.use(express.json())
app.use(cors())

//connect Database
connectDB()

//end-points
app.use('/api/images', express.static('uploads'))
app.use('/api/food', foodRouter)

app.get('/', (req, res) => {
    res.send('Node Runnning..')
})




app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


