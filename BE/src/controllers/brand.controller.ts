import { Request, Response } from 'express'
import { Brand } from '../model/brand.model.js'

export const getAllBrand = async (_req: Request, res: Response) => {
    try {
        const Brands = await Brand.find()
        if (!Brands) return res.status(404).json({ message: "Brands not found!" })
        res.status(200).json({ Brands })
    } catch (error) {
        console.error("Error while get brands!", error)
        res.status(500).json({ message: "Error while get brands!" })
    }
}

export const getBrandById = async (req: Request, res: Response) => {
    try {
        const findBrand = await Brand.findById(req.params.id)
        if (!findBrand) return res.status(404).json({ message: "Brand not found!" })
        res.status(200).json({ findBrand })
    } catch (error) {
        console.error("Error while get brand!", error)
        res.status(500).json({ message: "Error while get brand!" })
    }
}

export const createBrand = async (req: Request, res: Response) => {
    try {
        const { name, country, description } = req.body
        const newBrand = new Brand({
            name, country, description
        })
        await newBrand.save()
        res.status(201).json({ message: "Add new brand succeeded!", newBrand })
    } catch (error) {
        console.error("Error while create brand!", error)
        res.status(500).json({ message: "Error while create brand!" })
    }
}

export const updateBrand = async (req: Request, res: Response) => {
    try {
        const dataNew = req.body
        const updated = await Brand.findByIdAndUpdate(req.params.id, { $set: dataNew }, { new: true })
        if (!updated) return res.status(404).json({ message: "Brand not found!" })
        res.status(201).json({ message: "Update brand succeeded!", updated })
    } catch (error) {
        console.error("Error while find brand!", error)
        res.status(500).json({ message: "Error while find brand!" })
    }
}

export const deleteBrand = async (req: Request, res: Response) => {
    try {
        const deleted = await Brand.findByIdAndDelete(req.params.id)
        if (!deleted) return res.status(404).json({ message: "Brand not found!" })
        res.status(201).json({ message: "Delete brand succeeded!", deleted })
    } catch (error) {
        console.error("Error while find brand!", error)
        res.status(500).json({ message: "Error while find brand!" })
    }
}