const Author = require("../models/author.model");

class AuthorService {
  async add(firstname, lastname, patronymic) {
    return await Author.create({
      firstname,
      lastname,
      patronymic,
    });
  }

  async get(data) {
    return await Author.findOne(data);
  }

  async list(skip) {
    return await Author.find({}).limit(10).skip(skip);
  }

  async getTotal() {
    return await Author.countDocuments();
  }

  async getById(_id) {
    return await Author.findById(_id);
  }

  async find(term, filter = {}) {
    return await User.find({
      name: { $regex: term, $options: "i" },
      ...filter,
    });
  }

  async update(_id, newData) {
    console.log(_id, newData);

    return await Author.findOneAndUpdate({ _id }, newData, { new: true });
  }

  async getAuthorData(_id) {
    return await Author.findOne({ _id });
  }
}

module.exports = new AuthorService();
