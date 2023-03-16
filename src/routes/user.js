const express = require("express");
const router = express.Router();
const { signUpUser, loginUser } = require("../controllers/user/authUserController");
const { getProduct, getProductById } = require("../controllers/user/userController");
// const {authenticate} = require("../middleware/protect");


router.get("/api/products", getProduct);
router.get("/api/product/:id", getProductById);
router.post("/signup", signUpUser);
router.post("/login", loginUser);


module.exports = router;