const express = require("express");
const router = express.Router();
const {createCart, getCart, deleteCart, removeItem} = require("../controllers/user/cartControllers");
const {auth} = require("../middleware/protect");

router.post("/api/cart", auth, createCart);
router.post("/api/cart/removeitem/:itemId", auth, removeItem);
router.get("/api/cart/:cartId", getCart);
router.delete("/api/cart/:cartId", deleteCart);

module.exports = router;