const { Router } = require("express");
const {
  getAll,
  getOne,
  categoryCreate,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { searchCategory } = require("../controllers/search.controller");
const isAdmin = require("../middlewares/isAdmin.middleware");

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The category managing API
 */

/**
 * @swagger
 * /search/category:
 *   get:
 *     summary: Search categories by name
 *     tags: [search]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the category to search for
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       // Define properties of the returned data here
 */

router.get("/search/category", searchCategory);
router.get("/category", getAll);
router.get("/category/:id", getOne);

router.post("/admin/category", isAdmin, categoryCreate);

router.put("/admin/category/:id", isAdmin, updateCategory);
router.delete("/admin/category/:id", isAdmin, deleteCategory);

module.exports = router;
