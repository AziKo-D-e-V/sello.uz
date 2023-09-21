const { Router } = require("express");
const isUser = require("../middlewares/isUser.middleware");
const { likes, getAll } = require("../controllers/like.controller");

const router = new Router();

// like
router.get("/likes", isUser, getAll);
router.post("/likes/:product_id", isUser, likes);

module.exports = router;
