import multer from 'multer'

const storage = multer.memoryStorage()
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, file, callback) {
        const allowType = ["image/jpg", "image/jpeg", "image/png"]
        if (!allowType.includes(file.mimetype))
            return callback(new Error("Only image files are allowed (JPEG, PNG, WEBP, GIF)."))
        callback(null, true)
    },
})