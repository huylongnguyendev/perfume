import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        trim: true,
        default: ""
    },
    admin: {
        type: Boolean,
        default: false
    },
    avatarUrl: String
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)
export default User