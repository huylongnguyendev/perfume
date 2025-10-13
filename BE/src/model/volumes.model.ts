import mongoose from 'mongoose'

const volumesSchema = new mongoose.Schema({
    size: Number,
    price: Number,
    stock: Number
}, {
    _id: false,
    timestamps: false
}
)

export default volumesSchema