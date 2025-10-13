import mongoose from 'mongoose'
import volumesSchema from './volumes.model.js'

function arrayLimit(v: Array<string>) {
    return v.length <= 5
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Brand"
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category",
    },
    description: {
        type: String,
        default: ""
    },
    volumes: [volumesSchema],
    notes: {
        top: [String],
        heart: [String],
        base: [String]
    },
    imgUrls: [
        {
            url: String,
            publicId: String
        }
    ]
},
    { timestamps: true }
)

const Product = mongoose.model("Product", productSchema)
export default Product