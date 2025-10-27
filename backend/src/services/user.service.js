import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import Session from '../models/session.model.js'

const salt = 12
const ACCESS_TOKEN_TTL = "15m"
const REFRESH_TOKEN_TTL = 24 * 60 * 60 * 1000
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

export const signUpService = (newUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { username, password, phoneNumber, fullName, address, admin } = newUser

            const isUserExist = await User.findOne({
                $or: [
                    { username },
                    { phoneNumber }
                ]
            })
            if (isUserExist)
                resolve({
                    message: "Tài khoản đã tồn tại hoặc không hợp lệ"
                })
            const hasedPassword = await bcrypt.hash(password, salt)
            const userCreated = await User.create({
                username,
                password: hasedPassword,
                phoneNumber,
                fullName,
                address,
                admin
            })
            if (userCreated)
                resolve({
                    message: "Đăng ký thành công!",
                    data: userCreated
                })
        } catch (error) {
            reject(error)
        }
    })
}

export const signInService = (userSign) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { userSignIn, password } = userSign
            const user = await User.findOne({
                $or: [
                    { username: userSignIn },
                    { phoneNumber: userSignIn }
                ]
            })

            if (!user)
                resolve({
                    message: "Tài khoản đăng nhập hoặc mật khẩu không đúng!"
                })
            const isCorrectPwd = await bcrypt.compare(password, user.password)
            if (!isCorrectPwd)
                resolve({
                    message: "Tài khoản đăng nhập hoặc mật khẩu không đúng!"
                })

            if (!ACCESS_TOKEN_SECRET)
                throw new Error("ACCESS_TOKEN_SECRET probably is null!")

            const accessToken = await jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL })

            const refeshToken = await crypto.randomBytes(64).toString("hex")

            await Session.create({
                userId: user._id,
                refreshToken: refeshToken,
                expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL)
            })

            resolve({
                message: "Đăng nhập thành công",
                accessToken,
                refeshToken,
                REFRESH_TOKEN_TTL
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const updateService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id)
            if (!user)
                resolve({
                    message: "Không tìm thấy người dùng!"
                })
            const userUpdated = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                data: userUpdated
            })

        } catch (error) {
            reject(error)
        }
    }) 
}