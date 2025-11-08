import express from 'express'
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js'


const router = express.Router()

router.get("/", getCart)
router.post("/", addToCart)
router.delete("/:productId", removeFromCart)

const cartRouter = router
export default cartRouter