const { Router } = require("express");
const { create } = require("../controllers/product.controller");
const isSeller = require("../middlewares/isSeller.middleware");

const router = new Router();

router.post("/product", isSeller, create);

module.exports = router;
