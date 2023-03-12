const express = require("express");
const router = express.Router();
const { signUpUser, loginUser } = require("../controllers/loginController");

router.post("/signup", signUpUser);
router.post("/login", loginUser);



module.exports = router;