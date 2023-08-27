const { register } = require("../controller/registerController");

const router = require("express").Router();

router.post("/", register);

module.exports = router;
