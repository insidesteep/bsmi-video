const Video = require("../models/video.model");
const Author = require("../models/author.model");

class VideoService {
  async add(videoData) {
    return new Video(videoData);
  }

  async get(youtubeId) {
    return await Video.findOne({ youtubeId });
  }

  async list(skip, term, filter) {
    let params = {};

    if (term) {
      params.title = { $regex: term, $options: "i" };
    }

    params = { ...params, ...filter };

    return await Video.find(params)
      .limit(12)
      .skip(skip)
      .select("-category -description -youtubeId")
      .populate({
        path: "author",
        model: "Author",
      });
  }

  async getById(_id) {
    return await Video.findOne({ _id }).populate([
      {
        path: "author",
        model: "Author",
      },
      {
        path: "category",
        model: "Category",
        select: "-videos -playlistId",
      },
    ]);
  }

  async getAnotherVideosAuthor(authorId, currentVideoId) {
    return await Video.find({
      author: authorId,
      _id: { $ne: currentVideoId },
    })
      .limit(6)
      .select("-category -description -youtubeId")
      .populate("author");
  }

  async find(term, filter = {}) {
    return await User.find({
      name: { $regex: term, $options: "i" },
      ...filter,
    });
  }

  async getPopularVideos() {
    return await Video.find({})
      .sort({ viewCount: -1 })
      .limit(4)
      .select("-category -description -youtubeId")
      .populate({
        path: "author",
        model: "Author",
      });
  }

  async getLatestVideos() {
    return await Video.find({})
      .sort({ createdAt: 1 })
      .limit(4)
      .select("-category -description -youtubeId")
      .populate({
        path: "author",
        model: "Author",
      });
  }

  async deleteById(_id) {
    return await Video.findOneAndDelete({ _id });
  }

  async getTotal(params = {}) {
    return await Video.countDocuments(params);
  }
}

module.exports = new VideoService();
