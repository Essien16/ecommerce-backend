const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { signUpUser, loginUser } = require("../controllers/user/userController");


router.get("/api/products", async(req, res) => {
    const product = await Product.find()
    res.send(product)
});

router.get("/api/product/:id", async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).send("The product with the given ID does not exists.");

    res.send(product);
});

router.post("/signup", signUpUser);
router.post("/login", loginUser);



module.exports = router;