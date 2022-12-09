const { Router } = require("express");

const {
  add,
  getById,
  deleteById,
  list,
  incrementVideView,
  getLastAndPopularVideos,
  getVideosByAuthor,
} = require("../controllers/video.controller");
const auth = require("../middlewares/auth");
// const auth = require("../middlewares/auth");

const router = Router();

router.get("/home", getLastAndPopularVideos);
router.get("/", list);
router.get("/:id", getById);
router.delete("/:id", auth, deleteById);
router.get("/author/:byAuthor", getVideosByAuthor);
router.post("/viewcount", incrementVideView);
router.post("/", auth, add);

module.exports = router;
