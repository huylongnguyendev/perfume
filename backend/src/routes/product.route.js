import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getOneProduct, updateProduct } from '../controllers/product.controller.js'
import { authMiddleware } from '../middleware/admin.middleware.js'

const router = express.Router()

router.get("/", getAllProduct)
router.get("/:id", getOneProduct)
router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

const productRouter = router
export default productRouter