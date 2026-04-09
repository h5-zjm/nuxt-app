// server/models/userSchema.ts
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String },
    nickName: { type: String },
    picture: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    type: { type: String, default: 'email' },
    provider: { type: String },
    oauthID: { type: String },
    role: { type: String, default: 'normal' },
    disabled:{type:Boolean,default:false},
}, {
    timestamps: true,
    toJSON: {
        transform(_doc, ret) {
            delete ret.password
            delete ret.__v
        }
    }
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)
export type UserDocument = mongoose.InferSchemaType<typeof userSchema>
