import express from 'express'
import { createProduct, getAllProduct, getOneProduct } from '../controllers/product.controller.js'
import { authMiddleware } from '../middleware/admin.middleware.js'

const router = express.Router()

router.get("/", getAllProduct)
router.get("/:id", getOneProduct)
router.post("/", authMiddleware, createProduct)


const productRouter = router
export default productRouter