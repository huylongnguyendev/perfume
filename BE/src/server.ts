import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/mongoDB.js'
import productRouter from './routes/product.route.js'
import brandRouter from './routes/brand.route.js'

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())
connectDB()

app.use("/api/products", productRouter)
app.use("/api/brands", brandRouter)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})