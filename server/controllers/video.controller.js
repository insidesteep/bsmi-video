const VideoService = require("../services/video.service");
const CategoryService = require("../services/category.service");

const add = async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnail,
      youtubeId,
      viewCount,
      duration,
      author,
      category,
    } = req.body;

    const isExistVideo = await VideoService.get(youtubeId);

    if (isExistVideo) {
      return res
        .status(400)
        .json({ success: false, message: "Видео уже было сохранено!" });
    }

    let ctg = await CategoryService.get(category.playlistId);

    if (!ctg) {
      ctg = await CategoryService.add({
        name: category.name,
        playlistId: category.playlistId,
      });
    }

    const video = await VideoService.add({
      title,
      description: description || "Нет описания",
      thumbnail,
      youtubeId,
      viewCount,
      duration,
      author,
    });

    console.log(ctg);

    ctg.videos.push(video._id);
    video.category = ctg._id;

    await ctg.save();
    await video.save();

    res.status(200).json({ success: true, message: "Видео успешно сохранено" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Ошибка при сохранении видео" });
  }
};

const list = async (req, res) => {
  const { page, search } = req.query;
  const perPage = 10;
  const skip = perPage * (page - 1);

  try {
    const videos = await VideoService.list(skip, search || "");

    const count = await VideoService.getTotal();

    res.status(200).json({ success: true, data: { videos, count } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

const incrementVideView = async (req, res) => {
  try {
    const { videoId } = req.body;

    const video = await VideoService.getById(videoId);

    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Видео не найдено" });
    }

    video.viewCount++;

    await video.save();

    res.status(200).json({ success: true, message: "Просмотрено +1" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

const getVideosByAuthor = async (req, res) => {
  const { byAuthor } = req.params;

  const { page, search } = req.query;
  const perPage = 10;
  const skip = perPage * (page - 1);

  try {
    const videos = await VideoService.list(skip, search || "", {
      author: byAuthor,
    });

    const count = await VideoService.getTotal({ author: byAuthor });

    res.status(200).json({ success: true, data: { videos, count } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await VideoService.getById(id);

    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Видео не найдено!" });
    }

    const otherVideos = await VideoService.getAnotherVideosAuthor(
      video.author._id,
      id
    );

    //   .select("-category -description -youtubeId")
    //   .populate({
    //     path: "author",
    //     model: "Author",
    //     select: "-_id",
    //   });
    res.status(200).json({ success: true, data: { video, otherVideos } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await VideoService.deleteById(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Видео не найдено!" });
    }

    console.log(deleted.category, deleted._id);

    await CategoryService.deleteVideoById(deleted.category, deleted._id);

    res.status(200).json({ success: true, message: "Видео успешно удалено" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getLastAndPopularVideos = async (req, res) => {
  try {
    const popular = await VideoService.getPopularVideos();
    const latest = await VideoService.getLatestVideos();

    res.status(200).json({ success: true, data: { popular, latest } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};

module.exports = {
  add,
  list,
  deleteById,
  getById,
  incrementVideView,
  getLastAndPopularVideos,
  getVideosByAuthor,
};
