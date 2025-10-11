import { Request, Response } from 'express'
import { Product } from '../model/product.model.js'
import { Brand } from '../model/brand.model.js'
import { Category } from '../model/category.model.js'

export const getAllProduct = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 1
    const skip = (page - 1) / limit

    try {
        const Perfumes = await Product.find()
            .populate("brand")
            .populate("category")
            .limit(limit)
            .skip(skip)
            .exec()
        if (!Perfumes)
            return res.status(404).json({ message: "Products not found!" })
        const total = await Product.countDocuments()
        res.status(200).json({
            items: Perfumes,
            page,
            totalItems: total,
            totalPages: Math.ceil(total / limit)

        })
    } catch (error) {
        console.error("Error while get all product!", error)
        res.status(500).json({
            success: false,
            message: "Error while get all product!"
        })
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const Perfume = await Product.findById(req.params.id)
            .populate("brand")
            .populate("category")
            .exec()

        if (!Perfume)
            return res.status(404).json({ message: "Product not found!" })

        res.status(200).json(Perfume)
    } catch (error) {
        console.error("Error while get product!", error)
        res.status(500).json({
            success: false,
            message: "Error while get product!"
        })
    }
}

export const createNewProduct = async (req: Request, res: Response) => {
    try {
        const { name, brand, description, category, notes, volumes, imgUrls, isActive } = req.body

        const findBrand = await Brand.exists({ _id: brand })
        const findCategory = await Category.exists({ _id: category })
        if (!findBrand || !findCategory)
            res.status(400).json({ message: "Brand or Category is not valid!" })
        const newProduct = new Product({
            name, brand, description, category, notes, volumes, imgUrls, isActive
        })

        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        console.error("Error while create product!", error)
        res.status(500).json({
            success: false,
            message: "Error while create product!"
        })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { name, brand, description, category, notes, volumes, imgUrls, isActive } = req.body

        const findBrand = await Brand.exists({ _id: brand })
        const findCategory = await Category.exists({ _id: category })
        if (!findBrand || !findCategory)
            res.status(400).json({ message: "Brand or Category is not valid!" })

        const updated = await Product.findByIdAndUpdate(req.params.id,
            {
                ...(name && { name }),
                ...(brand && { brand }),
                ...(description && { description }),
                ...(category && { category }),
                ...(notes && { notes }),
                ...(volumes && { volumes }),
                ...(imgUrls && { imgUrls }),
                ...(isActive !== undefined && { isActive }),
            },
            { new: true }
        )
        if (!updated)
            res.status(404).json({ message: "Product not found!" })
        res.status(201).json({ message: "update product succeeded", product: updated })
    } catch (error) {
        console.error("Error while update product!", error)
        res.status(500).json({
            success: false,
            message: "Error while update product!"
        })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        if (!deletedProduct)
            return res.status(404).json({ message: "Product not found!" })
        res.status(201).json({ message: "Product deleted!", product: deletedProduct })
    } catch (error) {
        console.error("Error while delete product!", error)
        res.status(500).json({
            success: false,
            message: "Error while delete product!"
        })
    }
}