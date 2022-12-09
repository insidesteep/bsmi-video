const { Schema, model } = require("mongoose");

const VideoSchema = new Schema(
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

module.exports = model("Video", VideoSchema);
