const { Router } = require("express");

const {
  add,
  list,
  update,
  getAuthorData,
} = require("../controllers/author.controller");
const auth = require("../middlewares/auth");
// const auth = require("../middlewares/auth");

const router = Router();

router.get("/", auth, list);
router.get("/:id", getAuthorData);
router.post("/", add);

router.put("/", auth, update);

module.exports = router;
