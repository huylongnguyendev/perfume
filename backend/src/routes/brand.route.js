import express from 'express'
import { createBrand, getAllBrand } from '../controllers/brand.controller.js'
// import { authMiddleware } from '../middleware/admin.middleware.js'

const router = express.Router()

router.get("/", getAllBrand)
router.post("/", createBrand)

const brandRouter = router
export default brandRouter