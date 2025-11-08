import express from 'express'
import multer from 'multer'
import cloudinary from '../config/cloudinary.js'
import { Readable } from 'stream'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'products' },
      (error, result) => {
        if (error || !result) return reject(error)
        resolve(result.secure_url)
      }
    )
    Readable.from(fileBuffer).pipe(stream)
  })
}

router.post('/upload-multiple', upload.array('images', 10), async (req, res) => {
  try {
    const files = req.files
    if (!files || files.length === 0) return res.status(400).json({ error: 'Không có ảnh nào được gửi lên' })

    const urls = []
    for (const file of files) {
      const url = await uploadToCloudinary(file.buffer)
      urls.push(url)
    }

    res.status(200).json({ urls })
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi upload ảnh' })
  }
})
const uploadRouter = router
export default uploadRouter