const express = require("express");
const router = express.Router();
const { signUpUser, loginUser } = require("../controllers/loginController");
// const { auth, isAdmin } = require("../middleware/protect");

router.post("/signup", signUpUser);
router.post("/login", loginUser);



module.exports = router;