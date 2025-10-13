import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from '../controllers/product.controller.js'
import { upload } from '../middleware/upload.middleware.js'

const router = express.Router()

router.get("/", getAllProduct)
router.get("/:id", getProductById)
router.post("/", upload.array("image", 5), createProduct)
router.put("/", updateProduct)
router.delete("/:id", deleteProduct)

export default router