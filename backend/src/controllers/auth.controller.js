import Session from '../models/session.model.js'
import User from '../models/user.model.js'
import { signInService, signUpService, updateService } from '../services/user.service.js'

export const authSignUp = async (req, res) => {
    try {
        const { username, password, phoneNumber } = req.body
        if (!username || !password || !phoneNumber)
            return res.status(406).json({ message: "Các thông tin là bắt buộc!" })
        const newUser = await signUpService(req.body)
        res.status(201).json(newUser)
    } catch (error) {
        console.log("Lỗi khi gọi Sign Up", error)
        res.status(500).json({message: "Lỗi hệ thống"})
    }
}

export const authSignIn = async (req, res) => {
    try {
        const {userSignIn, password } = req.body
        if (!userSignIn || !password)
            return res.status(406).json({ message: "Các thông tin là bắt buộc!" })
        const userIn = await signInService(req.body)
        res.cookie("refeshToken", userIn.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: userIn.REFRESH_TOKEN_TTL
        })
        const accessToken = userIn.accessToken
        res.status(200).json({message: userIn.message, accessToken})
    } catch (error) {
        console.log("Lỗi khi gọi Sign In", error)
        res.status(500).json({message: "Lỗi hệ thống"})
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const updated = await updateService(id, data)
        res.status(201).json({message: "Cập nhật thành công!", updated})
    } catch (error) {
        console.log("Lỗi khi gọi update", error)
        res.status(500).json({message: "Lỗi hệ thống"})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id

        await User.findByIdAndDelete(id)
        await Session.findOneAndDelete({userId: id})
        res.status(201).json({message: "Xóa người dùng thành công!"})
    } catch (error) {
        console.log("Lỗi khi gọi Xóa người dùng", error)
        res.status(500).json({message: "Lỗi hệ thống"})
    }
}