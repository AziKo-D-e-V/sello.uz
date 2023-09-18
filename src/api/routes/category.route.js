const { Router } = require("express");
const {
  getAll,
  getOne,
  categoryCreate,
} = require("../controllers/category.controller");
const { searchCategory } = require("../controllers/search.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");

const router = new Router();

router.get("/search/category", searchCategory);
router.get("/category", getAll);
router.get("/category/:id", getOne);

router.post("/admin/category", isAdmin, categoryCreate);

module.exports = router;
