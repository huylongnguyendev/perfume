import axiosImage from '@/lib/axiosImageClient'

export const imageApi = {
  uploadImage: async (files: Array<File>): Promise<Array<string>> => {
    const formData = new FormData()
    files.forEach(file => formData.append("images", file))

    try {
      const res = await axiosImage.post("/upload/upload-multiple", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      return res.data.urls // 👈 đảm bảo trả về mảng URL
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error)
      return []
    }
  }
}
