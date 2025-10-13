import express from 'express'
import { uploadImg } from '../controllers/uploadImage.controller.js'

const router = express.Router()

router.post("/upload", uploadImg)

export default router