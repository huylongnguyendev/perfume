import express from 'express'
import { createProduct, getAllProduct, getOneProduct } from '../controllers/product.controller.js'

const router = express.Router()

router.get("/", getAllProduct)
router.get("/:id", getOneProduct)
router.post("/", createProduct)


const productRouter = router
export default productRouter