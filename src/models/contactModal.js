import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    contactId: {
        type: String,
        unique: true,
        required: [true, "Please provide a contact id"],
    },
    fullName: {
        type: String,
        required: [true, "Please provide a fullname"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
    },
    mobile: {
        type: Number,
        required: [true, "Please provide a mobile number"],
    },
    message: {
        type: String,
        required: [true, "Please provide a message"],
    },
    isAnswered: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
})

const contactus = mongoose.models.contactus || mongoose.model("contactus", contactSchema)

export default contactus