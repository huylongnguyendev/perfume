import express from 'express'
import { connectDB } from './config/mongoDB.js'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
const API = process.env.API
app.use(express.json())
app.use(cors())

app.use(`${API}/auth`, authRouter)

app.use(`${API}/products`, productRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
})