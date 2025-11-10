import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers["authorization"]
  const token = authHeaders && authHeaders.split(" ")[1]
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET

  if (!token) return res.status(401).json({ message: "Thiếu token xác thực!" })

  if (token) {
    jwt.verify(token, ACCESS_TOKEN, async (error, user) => {
      if (error) {
        console.log(error)
        return res.status(403).json({ message: "Token không hợp lệ!" })
      }
      const findUser = await User.findById(user.userId)
      if (!findUser)
        return res.status(404).json({ message: "Người dùng không đúng!" })
      const isAdmin = findUser.admin
      if (!isAdmin)
        return res.status(403).json({ message: "Bạn không có quyền truy cập!" })
      next()
    })
  }
}