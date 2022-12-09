import mongoose, { Schema } from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    youtubeId: {
      type: String,
      required: true,
      unique: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      default: "00:00",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Video || mongoose.model("Video", VideoSchema);
