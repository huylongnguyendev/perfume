import express from 'express'
import { connectDB } from './config/mongoDB.js'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import productRouter from './routes/product.route.js'
import cors from 'cors'
import brandRouter from './routes/brand.route.js'
import cartRouter from './routes/cart.route.js'
import { verifyUser } from './middleware/user.middleware.js'
import cookieParser from 'cookie-parser'
import uploadRouter from './routes/image.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
const API = process.env.API
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(`${API}/auth`, authRouter)

app.use(`${API}/brands`, brandRouter)
app.use(`${API}/products`, productRouter)
app.use(`${API}/cart`, verifyUser, cartRouter)
app.use(`${API}/upload`, uploadRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
})