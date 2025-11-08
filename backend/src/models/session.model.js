import mongoose from 'mongoose'

const SessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date
    }
}, { timestamps: true })

SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const Session = mongoose.model("Session", SessionSchema)
export default Session