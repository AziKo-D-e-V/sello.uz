const { Router } = require("express");
const { register, login, verify } = require("../controllers/seller.controller");
const router = new Router();

router.post("/seller/signup", register);
router.post("/seller/signin", login);
router.post("/seller/signup/verify", verify);

module.exports = router;
