import Cart from '../models/cart.model.js'

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user_id }).populate("items.productId")
        res.status(200).json({ message: "Lấy giỏ hàng thành công", cart })
    } catch (error) {
        console.log("Lỗi khi gọi Giỏ hàng", error)
        res.status(500).json({ message: "Lỗi hệ thống" })
    }
}

export const addToCart = async (req, res) => {
    try {
        const userId = req.user_id
        const { quantity, productId, selectedVolume } = req.body
        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = await Cart.create({ userId, items: [{ productId, quantity, selectedVolume }] })
        }
        else {
            const isExistItem = cart.items.find(item => item.productId.toString() === productId && item.selectedVolume.volume === selectedVolume.volume)
            if (isExistItem)
                isExistItem.quantity += quantity
            else
                cart.items.push({ productId, quantity, selectedVolume })
            await cart.save()
        }
        res.status(201).json({ message: "Thêm vào giỏ hàng thành công", cart })
    } catch (error) {
        console.log("Lỗi khi thêm vào giỏ hàng", error)
        res.status(500).json({ message: "Lỗi hệ thống" })
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user_id
        const { productId } = req.params
        const { volume } = req.body

        if (!volume || typeof volume !== "number") {
            return res.status(400).json({ message: "Thiếu hoặc sai định dạng volume" })
        }


        const cart = await Cart.findOne({ userId })
        if (!cart)
            return res.status(404).json({ message: "Không tìm thấy giỏ hàng" })

        const isExistItem = cart.items.find(item => item.productId.toString() === productId)
        if (!isExistItem)
            return res.status(404).json({ message: "Không tìm thấy sản phẩm để xóa" })

        cart.items = cart.items.filter(item => !(item.productId.toString() === productId && item.selectedVolume.volume === volume))

        await cart.save()

        res.status(201).json({ message: "Xóa sản phẩm thành công", cart })
    } catch (error) {
        console.log("Lỗi khi xóa sản phẩm khỏi giỏ hàng", error)
        res.status(500).json({ message: "Lỗi hệ thống" })
    }
}