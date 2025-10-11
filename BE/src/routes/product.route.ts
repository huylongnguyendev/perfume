import express from 'express'
import { createNewProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from '../controllers/product.controller.js'

const router = express.Router()

router.get("/", getAllProduct)
router.get("/:id", getProductById)
router.post("/", createNewProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)
export default router