import Session from '../models/session.model.js'
import User from '../models/user.model.js'
import { generateTokens, saveRefreshToken } from '../services/user.service.js'
import jwt from 'jsonwebtoken'
import bcrypt, { genSaltSync } from 'bcrypt'
import dotenv from 'dotenv'
import { strict } from 'assert'
dotenv.config()
const salt = genSaltSync(12)
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const ACCESS_TOKEN_TTl = "15m"
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const REFRESH_TOKEN_TTl = 1 * 24 * 60 * 60 * 1000

export const authSignIn = async (req, res) => {
    try {
        const { userSignin, password } = req.body
        const isExistUser = await User.findOne({
            $or: [
                { username: userSignin },
                { phoneNumber: userSignin }
            ]
        })
        if (!isExistUser) return res.status(401).json({ message: "Tài khoản đăng nhập không hợp lệ hoặc không tồn tại" })
        const isPasswordValid = await bcrypt.compare(password, isExistUser.password)
        if (!isPasswordValid)
            return res.status(403).json({ message: "Tài khoản đăng nhập không hợp lệ hoặc mật khẩu không đúng" })
        const { accessToken, refreshToken } = await generateTokens(isExistUser._id, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TTl, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TTl)

        await saveRefreshToken(isExistUser._id, refreshToken, REFRESH_TOKEN_TTl)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: REFRESH_TOKEN_TTl
        })

        const user = isExistUser.toObject()
        delete user.password

        res.status(200).json({
            message: "Đăng nhập thành công!",
            user,
            accessToken,
        })

    } catch (error) {
        console.log("Lỗi khi Đăng nhập", error)
        res.status(500).json({ message: "Lỗi hệ thống!" })
    }
}

export const authSignUp = async (req, res) => {
    try {
        const { username, email, password, address, admin, phoneNumber, fullName } = req.body
        const isExistUser = await User.findOne({
            $or: [
                { username },
                { phoneNumber }
            ]
        })
        if (isExistUser) return res.status(409).json({ message: "Người dùng không hợp lệ hoặc đã tồn tại" })
        const hashedPassword = await bcrypt.hash(password, salt)
        await User.create({
            username,
            password: hashedPassword,
            address,
            admin,
            address,
            email,
            phoneNumber,
            fullName
        })
        res.status(200).json({ message: "Đăng ký thành công!" })
    } catch (error) {
        console.log("Lỗi khi Đăng nhập", error)
        res.status(500).json({ message: "Lỗi hệ thống!" })
    }
}

export const authSignOut = async (req, res) => {
    try {
        const token = req.cookies.refreshToken

        if (!token)
            return res.status(400).json({ message: "Không tìm thấy token!" })

        await Session.findOneAndDelete({ refreshToken: token })
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "development" ? "None" : "Lax"
        })
        res.sendStatus(200)
    } catch (error) {
        console.log("Lỗi khi Đăng nhập", error)
        res.status(500).json({ message: "Lỗi hệ thống!" })
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.user_id
        const user = await User.findById(userId).select("-password")
        if (!user)
            return res.status(404).json({ message: "Không tìm thấy người dùng" })
        res.status(200).json({ message: "TÌm kiếm thông tin người dùng thành công", user })
    } catch (error) {
        console.log("Lỗi khi lấy thông tin người dùng", error)
        res.status(500).json({ message: "Lỗi hệ thống!" })
    }
}

export const authRefreshToken = async (req, res) => {
    try {
        const userRefreshToken = req.cookies.refreshToken
        if (!userRefreshToken)
            return res.status(401).json({ message: "Token không hợp lệ" })
        const session = await Session.findOne({ refreshToken: userRefreshToken })
        if (!session || session.expiresAt < new Date())
            return res.status(401).json({ message: "Token không hợp lệ hoặc hết hạn" })

        let decoded
        try {
            decoded = jwt.verify(userRefreshToken, REFRESH_TOKEN_SECRET)
        } catch (error) {
            return res.status(403).json({ message: "Token không hợp lệ hoặc hết hạn" })
        }

        const { accessToken, refreshToken } = await generateTokens(decoded.user_id, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_TTl, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TTl)

        await saveRefreshToken(session.userId, refreshToken, REFRESH_TOKEN_TTl)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: REFRESH_TOKEN_TTl
        })

        const user = await User.findById(decoded.user_id).select("-password")

        res.status(201).json({ message: "Tạo mới tokens thành công", user, accessToken })

    } catch (error) {
        console.log("Lỗi khi Đăng nhập", error)
        res.status(500).json({ message: "Lỗi hệ thống!" })
    }
}