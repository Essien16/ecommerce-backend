const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.post("/", async(req, res) => {
    item = new Cart(req.body);
    await item.save();
});

router.get("/:id", async(req,res) => {
    const cart = await Cart.findById(req.params.id);
    res.send(cart)
});

router.delete("/:id", async(req, res) => {
    const cart = await Cart.findByIdAndRemove(req.params.id)
    res.send(cart);
});

module.exports = router;