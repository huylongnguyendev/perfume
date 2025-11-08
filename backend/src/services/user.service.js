import jwt from 'jsonwebtoken'

import Session from '../models/session.model.js'

export const generateTokens = (userId, accessSecret, accessTTL, refreshSecret, refreshTTL) => {
    const accessToken = jwt.sign({ user_id: userId }, accessSecret, { expiresIn: accessTTL })
    const refreshToken = jwt.sign({ user_id: userId }, refreshSecret, { expiresIn: refreshTTL })
    return { accessToken, refreshToken }
}

export const saveRefreshToken = async (userId, refreshToken, REFRESH_TOKEN_TTL) => {
    try {
        const session = await Session.findOne({ userId })
        const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL)
        if (session) {
            session.refreshToken = refreshToken
            session.expiresAt = expiresAt
            await session.save()
        } else {
            await Session.create({
                userId,
                refreshToken,
                expiresAt
            })
        }
    } catch (error) {
        console.log("Lỗi khi lưu token", error)
    }
}

export const updateTokens = async () => {

}