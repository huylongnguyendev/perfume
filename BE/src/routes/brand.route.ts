import express from 'express'
import { createBrand, getAllBrand, getBrandById, updateBrand } from '../controllers/brand.controller.js'

const router = express.Router()

router.get("/", getAllBrand)
router.get("/:id", getBrandById)
router.get("/", createBrand)
router.get("/:id", updateBrand)
router.get("/:id", getAllBrand)

export default router