import express from 'express'
import { authSignIn, authSignUp, deleteUser, updateUser } from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post("/signup", authSignUp)
router.post("/signin", authSignIn)
router.patch("/user/:id", updateUser)
router.delete("/user/:id", authMiddleware, deleteUser)

const authRouter = router
export default authRouter