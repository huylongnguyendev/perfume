import Product from '../models/product.model.js'
import { productSerivce } from '../services/product.service.js'


export const getAllProduct = async (req, res) => {
    const pages = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12
    const skip = (pages - 1) * limit
    const filters = {}

    if (req.query.search)
        filters.name = { $regex: req.query.search, $options: "i" }
    if (req.query.brand)
        filters.brand = req.query.brand
    if (req.query.gender)
        filters.gender = req.query.gender
    if (req.query.category)
        filters.category = req.query.category

    if (req.query.minPrice || req.query.maxPrice) {
        filters['volumes.price'] = {}
        if (req.query.minPrice) filters['volumes.price'].$gte = Number(req.query.minPrice)
        if (req.query.maxPrice) filters['volumes.price'].$lte = Number(req.query.maxPrice)
    }


    try {
        const products = await Product.find(filters).skip(skip).limit(limit)
        const total = await Product.countDocuments(filters)
        res.status(200).json({
            pages,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            products,
        })
    } catch (error) {
        console.log("Lỗi khi gọi Danh sách sản phẩm", error)
        res.status(500).json({ message: "Lỗi hệ thống" })
    }
}

export const getOneProduct = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if (!product)
            return res.status(404).json({ message: "Không tìm thấy sản phẩm!" })
        res.status(200).json(product)
    } catch (error) {
        console.log("Lỗi khi gọi Sản phẩm", error)
        res.status(500).json({ message: "Lỗi hệ thống" })
    }
}

export const createProduct = async (req, res) => {
    try {
        console.log(req.body)
        const { name,
            brand,
            description,
            gender,
            category,
            images,
            scents,
            volumes
        } = req.body

        if (!name || !brand || !category || !volumes?.length) {
            return res.status(400).json({ message: "Thiếu thông tin bắt buộc" })
        }

        const newProduct = await productSerivce(req.body)
        console.log(newProduct)

        res.status(201).json({ message: "Tạo sản phẩm thành công", product: newProduct })

    } catch (error) {
        console.log("Lỗi khi gọi Tạo sản phẩm", error)
        res.status(500).json({ message: "Lỗi hệ thống" })
    }
}