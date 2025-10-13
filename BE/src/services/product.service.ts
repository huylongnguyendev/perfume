import { uploadBufferCloudinary } from './upload.service.js'

export const createProductImageService = async (files: Express.Multer.File[]) => {
    if (!files || files.length === 0)
        throw new Error("Upload atleast one picture!")
    if (files.length > 5)
        throw new Error("Maximum 5 pictures!")
    const imgUrls = await Promise.all(
        files.map(file => uploadBufferCloudinary(file.buffer, file.originalname))
    )

    return imgUrls
}
