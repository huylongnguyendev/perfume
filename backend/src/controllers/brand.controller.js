import Brand from '../models/brand.model.js'

export const getAllBrand = async (_req, res) => {
    const sortName = { name: 1 }
    try {
        const allBrands = await Brand.find().sort(sortName)
        res.status(200).json(allBrands)
    } catch (error) {
        console.log("Lỗi khi gọi Danh sách thương hiệu", error)
        res.status(500).json({ message: "Lỗi hệ thống" })
    }
}
export const createBrand = async (req, res) => {
    try {
        const { name } = req.body
        if (!name)
            return res.status(400).json({ message: "Tên thương hiệu là bắt buộc!" })
        const isExistBrand = await Brand.findOne({ name })
        if (isExistBrand)
            return res.status(409).json({ message: "Thương hiệu đã tồn tại!" })

        const createNew = await Brand.create({
            name
        })

        res.status(200).json({ message: "Thêm thương hiệu thành công!", createNew })
    } catch (error) {
        console.log("Lỗi khi gọi Thêm thương hiệu", error)
        res.status(500).json({ message: "Lỗi hệ thống" })
    }
}