import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            selectedVolume: {
                volume: Number,
                discount: Number,
                priceOrig: Number,
                price: Number
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, { timestamps: true })

const Cart = mongoose.model("Cart", CartSchema)
export default Cart