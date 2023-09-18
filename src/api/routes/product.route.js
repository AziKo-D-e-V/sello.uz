const { Router } = require("express");
const { create, getOne, getAll } = require("../controllers/product.controller");
const isSeller = require("../middlewares/isSeller.middleware");
const { searchProduct } = require("../controllers/search.controller");

const router = new Router();

router.get("/search/product", searchProduct);
router.get("/product", isSeller, getAll);
router.get("/product/:id", isSeller, getOne);

router.post("/product/:id", isSeller, create);
router.post("/product/:id", isSeller, getOne);

module.exports = router;
