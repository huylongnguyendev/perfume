import { Request, Response } from 'express'
import Product from '../model/product.model.js'
import { Brand } from '../model/brand.model.js'
import { createProductImageService } from '../services/product.service.js'
import { deleteImageCloudinary } from '../services/upload.service.js'

export const getAllProduct = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 12
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
            page,
            total,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            items: Perfumes
        })
    } catch (error) {
        console.error("Error while get products!", error)
        res.status(500).json({ message: "Error while get products!" })
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const Perfume = await Product.findById(req.params.id)
            .populate("brand")
            .populate("category")
        if (!Perfume)
            return res.status(404).json({ message: "Product not found!" })
        res.status(200).json(Perfume)
    } catch (error) {
        console.error("Error while get product!", error)
        res.status(500).json({ message: "Error while get product!" })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, brand, category, description, volumes, notes } = req.body
        const imgUrls = createProductImageService(req.body as Express.Multer.File[])

        const findBrand = await Brand.exists({ _id: brand })
        const findCategory = await Brand.exists({ _id: category })
        if (!findBrand || !findCategory)
            return await res.status(404).json({ message: "Brand/Category not found!" })

        const newPerfume = new Product({
            name, brand, category, description, volumes, notes, imgUrls
        })
        await newPerfume.save()
        res.status(201).json({ message: "Create product succeeded!", newPerfume })
    } catch (error) {
        console.error("Error while create product!", error)
        res.status(500).json({ message: "Error while create product!" })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { name, brand, category, description, volumes, notes } = req.body
        const findBrand = await Brand.exists({ _id: brand })
        const findCategory = await Brand.exists({ _id: category })
        if (!findBrand || !findCategory)
            return await res.status(404).json({ message: "Brand/Category not found!" })
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            {
                ...name && { name },
                ...brand && { brand },
                ...category && { category },
                ...description && { description },
                ...volumes && { volumes },
                ...notes && { notes },
            },
            { new: true }
        )
        res.status(200).json({ message: "Update product succeeded!", updated })
    } catch (error) {
        console.error("Error while update product!", error)
        res.status(500).json({ message: "Error while update product!" })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id
        const Perfume = await Product.findById(productId)
        if (!Perfume)
            return res.status(404).json({ message: "Product not found!" })
        if (Array.isArray(Perfume.imgUrls)) {
            await Promise.all(
                Perfume.imgUrls.map(img => deleteImageCloudinary(img.publicId as string))
            )
        }
        await Product.findByIdAndDelete(productId)
        res.status(200).json({ message: "Delete product succeeded!" })

    } catch (error) {
        console.error("Error while get product!", error)
        res.status(500).json({ message: "Error while get product!" })
    }
}