import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const URI = process.env.MONGO_URI

export const connectDB = async () => {
    if (!URI) throw new Error("URI is not valid")
    try {
        await mongoose.connect(URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.error("error.message")
        process.exit(1)
    }
}