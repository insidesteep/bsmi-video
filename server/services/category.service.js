const Category = require("../models/category.model");

class CategoryService {
  async add(categoryData) {
    return new Category(categoryData);
  }

  async get(playlistId) {
    return await Category.findOne({
      playlistId,
    });
  }

  async list(user) {
    return await Conversation.find({ recipients: user._id }).populate(
      "recipients lastMessage"
    );
  }

  async getById(id) {
    return await Conversation.find({ _id: id });
  }

  async find(term, filter = {}) {
    return await User.find({
      name: { $regex: term, $options: "i" },
      ...filter,
    });
  }

  async deleteVideoById(categoryId, videoId) {
    return await Category.updateOne(
      { _id: categoryId },
      {
        $pull: {
          videos: videoId,
        },
      }
    );
  }
}

module.exports = new CategoryService();
