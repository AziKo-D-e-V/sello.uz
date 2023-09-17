const { Router } = require("express");
const { register, login, verify } = require("../controllers/user.controller");
const router = new Router();

router.post("/auth/signup", register);
router.post("/auth/signin", login);
router.post("/auth/signup/verify", verify);

module.exports = router;
