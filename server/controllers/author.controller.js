const VideoService = require("../services/video.service");
const CategoryService = require("../services/category.service");
const AuthorService = require("../services/author.service");

const add = async (req, res) => {
  try {
    const { firstname, lastname, patronymic } = req.body;

    const author = await AuthorService.get({
      firstname,
      lastname,
      patronymic,
    });

    if (author) {
      return res
        .status(400)
        .json({ success: false, message: "Пользователь существует" });
    }

    await AuthorService.add(firstname, lastname, patronymic);

    const authors = await AuthorService.list();

    const count = AuthorService.getTotal();

    res.status(200).json({ success: true, data: { authors, count } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const list = async (req, res) => {
  console.log("wadwad");
  const { page } = req.query;
  const perPage = 10;
  const skip = perPage * (page - 1);

  try {
    const authors = await AuthorService.list(skip);

    const count = await AuthorService.getTotal();

    res.status(200).json({ success: true, data: { authors, count } });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const update = async (req, res) => {
  try {
    const { authorId, firstname, lastname, patronymic } = req.body;

    const author = await AuthorService.update(authorId, {
      firstname,
      lastname,
      patronymic,
    });

    res.status(200).json({ success: true, data: author });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const getAuthorData = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await AuthorService.getAuthorData(id);

    if (!author) {
      return res.status(404).json({ success: false, message: "Автор не найден" });
    }

    res.status(200).json({ success: true, data: author });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

module.exports = { add, list, update, getAuthorData };
