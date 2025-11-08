import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import dotenv from 'dotenv'

dotenv.config()

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

export const verifyUser = async (req, res, next) => {
    const tokenHeaders = req.headers["authorization"]
    const token = tokenHeaders && tokenHeaders.split(" ")[1].trim()
    if (!token)
        return res.status(401).json({ message: "Token không hợp lệ hoặc không tồn tại" })
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
        req.user_id = decoded.user_id
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' })
    }
}