import express from 'express'
import { authRefreshToken, authSignIn, authSignOut, authSignUp, getProfile } from '../controllers/auth.controller.js'
// import { authMiddleware } from '../middleware/admin.middleware.js'
import { verifyUser } from '../middleware/user.middleware.js'
import { validateSignIn, validateSignUp } from '../middleware/validate.middleware.js'

const router = express.Router()

router.post("/signup", validateSignUp, authSignUp)
router.post("/signin", validateSignIn, authSignIn)
router.post("/signout", authSignOut)
router.get("/user/profile", verifyUser, getProfile)
router.post("/refresh", authRefreshToken)

const authRouter = router
export default authRouter