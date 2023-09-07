import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true},
    description: { type: String, required: true, trim: true},
    createdAt: { type: Date, required: true, default: Date.now},
    hashtags: [{ type: String, tirm: true}],
    meta: {
        views: {type: Number, default: 0, required: 0}
    }
})

const Video = mongoose.model("Video", videoSchema)

export default Video