const { Router } = require("express");
const {
  register,
  login,
  categoryCreate,
  getCategory,
} = require("../controllers/admin.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");
const router = Router();

router.get("/category", getCategory);

router.post("/admin/signup", register);
router.post("/admin/signin", login);
router.post("/admin/category", isAdmin, categoryCreate);

module.exports = router;
