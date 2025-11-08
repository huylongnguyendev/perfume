
export const validateSignIn = async (req, res, next) => {
    const { userSignin, password } = req.body
    if (!userSignin || typeof userSignin !== "string" || userSignin.trim().length < 3)
        return res.status(400).json({ message: "Username hoặc số điện thoại không hợp lệ!" })
    if (!password || typeof password !== "string" || password.trim().length < 8)
        return res.status(400).json({ message: "Mật khẩu không hợp lệ!" })
    next()
}

export const validateSignUp = async (req, res, next) => {
    const { username, password, phoneNumber, fullName, address } = req.body
    if (!username || typeof username !== "string" || username.trim().length < 3)
        return res.status(400).json({ message: "Username hoặc số điện thoại không hợp lệ!" })
    if (!password || typeof password !== "string" || password.trim().length < 8)
        return res.status(400).json({ message: "Mật khẩu không hợp lệ!" })
    if (!phoneNumber || typeof phoneNumber !== "string" || phoneNumber.trim().length < 10)
        return res.status(400).json({ message: "Số điện thoại không hợp lệ!" })
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 3)
        return res.status(400).json({ message: "Họ tên không hợp lệ!" })
    if (!address || typeof address !== "string" || address.trim().length < 3)
        return res.status(400).json({ message: "Họ tên không hợp lệ!" })
    next()
}