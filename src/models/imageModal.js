import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please provide a userId"],
    },
    imageId: {
        type: String,
        unique: true,
        required: [true, "Please provide a imageId"],
    },
    name: {
        type: String,
        required: [true, 'Please provide a image name'],
        default: 'Untitled'
    },
    summary: {
        type: String,
        required: [false, 'Please provide summary']
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
    },
    url: {
        type: String,
        required: [true, "Please provide a URL"],
    },
    reasons: {
        type: [],
        required: [true, "Please provide reasons"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});

const ImageModel = mongoose.models.images || mongoose.model("images", imageSchema);

export default ImageModel;
