import mongoose from 'mongoose'

const volume = new mongoose.Schema({
    sku: { type: String, required: true, unique: true },
    size: {
        type: Number,
        required: true
    },
    priceOrig: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    onStock: {
        type: Number,
        default: 0
    }
})

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    scents: {
        top: {
            type: [String],
            default: []
        },
        middle: {
            type: [String],
            default: []
        },
        base: {
            type: [String],
            default: []
        }
    },
    gender: {
        type: String,
        enum: ["Nam", "Nữ", "Unisex"]
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    images: {type: [String], default: []},
    volumes: [volume],
    images: { type: [String], default: [] },

}, { timestamps: true })
ProductSchema.index({ name: "text", brand: "text", description: "text" })

const Product = mongoose.model("Product", ProductSchema)
export default Product