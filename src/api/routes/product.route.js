const { Router } = require("express");
const { create } = require("../controllers/product.controller");
const isSeller = require("../middlewares/isSeller.middleware");

const router = new Router();

router.post("/product/:id", isSeller, create);

module.exports = router;
