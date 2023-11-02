import mongoose from "mongoose";
import { v4 as uuid } from 'uuid';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        default: uuid().split('-')[0]
    },
    fullName: {
        type: String,
        required: [true, "Please provide a Fullname"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    mobile: {
        type: Number,
        required: [true, "Please provide a Mobile number"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    profilePic: {
        type: String,
        default: ''
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['editor', 'studio'],
        required: [true, "Please specify the role"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}, {
    timestamps: true
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User