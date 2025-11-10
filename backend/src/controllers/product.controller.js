import Product from '../models/product.model.js'
import { productSerivce } from '../services/product.service.js'


export const getAllProduct = async (req, res) => {
  const pages = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 12
  const skip = (pages - 1) * limit
  const filters = {}

  if (req.query.search)
    filters.name = { $regex: req.query.search, $options: "i" }
  if (req.query.brand)
    filters.brand = req.query.brand
  if (req.query.gender)
    filters.gender = req.query.gender
  if (req.query.category)
    filters.category = req.query.category

  if (req.query.minPrice || req.query.maxPrice) {
    filters['volumes.price'] = {}
    if (req.query.minPrice) filters['volumes.price'].$gte = Number(req.query.minPrice)
    if (req.query.maxPrice) filters['volumes.price'].$lte = Number(req.query.maxPrice)
  }

  let sortOption = {}

  switch (req.query.sort) {
    case "newest": sortOption = { ...sortOption, createdAt: -1 }
      break
    case "priceAsc": sortOption = { ...sortOption, "volumes.price": 1 }
      break
    case "priceDesc": sortOption = { ...sortOption, "volumes.price": -1 }
      break
    default: sortOption = { ...sortOption }
      break
  }

  try {
    const products = await Product.find(filters).skip(skip).limit(limit).sort(sortOption)
    const total = await Product.countDocuments(filters)
    res.status(200).json({
      pages,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      products,
    })
  } catch (error) {
    console.log("Lỗi khi gọi Danh sách sản phẩm", error)
    res.status(500).json({ message: "Lỗi hệ thống" })
  }
}


export const getOneProduct = async (req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findById(id)
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm!" })
    res.status(200).json(product)
  } catch (error) {
    console.log("Lỗi khi gọi Sản phẩm", error)
    res.status(500).json({ message: "Lỗi hệ thống" })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name,
      brand,
      description,
      gender,
      category,
      images,
      scents,
      volumes
    } = req.body

    if (!name || !brand || !category || !volumes?.length) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" })
    }

    const processedVol = volumes.map(vol => {
      const price = Math.round(vol.priceOrig * (1 - vol.discount / 100))
      return {
        ...vol,
        price
      }
    })

    const newProduct = await Product.create({
      name,
      brand,
      description,
      gender,
      category,
      images,
      scents,
      volumes: processedVol
    })

    res.status(201).json({ message: "Tạo sản phẩm thành công", product: newProduct })

  } catch (error) {
    console.log("Lỗi khi gọi Tạo sản phẩm", error)
    res.status(500).json({ message: "Lỗi hệ thống" })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { name,
      brand,
      description,
      gender,
      category,
      images,
      scents,
      volumes
    } = req.body
    const productId = req.params.id

    if (!name || !brand || !category || !volumes?.length) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" })
    }

    const product = await Product.findById(productId)

    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" })

    const processedVol = volumes.map(vol => {
      const price = Math.round(vol.priceOrig * (1 - vol.discount / 100))
      return {
        ...vol,
        price
      }
    })

    await product.updateOne({
      brand,
      description,
      gender,
      category,
      images,
      scents,
      volumes: processedVol
    })

    res.status(201).json({ message: "Đã cập nhật sản phẩm"})

  } catch (error) {
    console.log("Lỗi khi gọi Sửa sản phẩm", error)
    res.status(500).json({ message: "Lỗi hệ thống" })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id
    if (!productId) return res.status(400)

    const productDelete = await Product.findByIdAndDelete(productId)

    if (!productDelete) return res.status(400).json({ message: "Sản phẩm không tồn tại để xóa" })

    res.status(201).json({ message: "Xóa sản phẩm thành công" })

  } catch (error) {
    console.log("Lỗi khi gọi Xóa sản phẩm", error)
    res.status(500).json({ message: "Lỗi hệ thống" })
  }
}