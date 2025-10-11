import mongoose from 'mongoose'

const volumeOptionSchema = new mongoose.Schema({
    size: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
}, {
    _id: false,
    timestamps: true
})

export default volumeOptionSchema