import mongoose from 'mongoose'
import volumeOptionSchema from './volumeOption.model.js'

function arrayLimit(val: Array<string>) {
    return val.length <= 5
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    notes: {
        top: [String],
        heart: [String],
        base: [String]
    },
    volumes: [volumeOptionSchema],
    imgUrls: {
        type: [String],
        validate: [arrayLimit, 'Maximum 5 pictures']
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    { timestamps: true }
)

export const Product = mongoose.model("Product", productSchema)