import cloudinary from '../config/cloudinary.config.js'

export const uploadBufferCloudinary = (buffer: Buffer, filename: string, folder = "perfume") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            folder,
            public_id: filename
        }, (error, result) => {
            if (error || !result) return reject(error)
            resolve(result?.secure_url)
        })
        uploadStream.end(buffer)
    })
}

export const deleteImageCloudinary = async (publicId: string) => {
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.error(`❌ Failed to delete image ${publicId}:`, error)
    }
}