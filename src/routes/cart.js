const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

router.post('/carts/:cartId/items', async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    const cartItem = new CartItem({
      product: productId,
      quantity,
    });

    const cart = await Cart.findById(cartId);
    cart.items.push(cartItem);
 
    await Promise.all([cart.save(), cartItem.save()]);
  
    res.status(201).json(cartItem);
});

router.get("/carts/:cartId", async(req,res) => {
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId).populate('items');
    res.send(cart);
});

router.delete("/:id", async(req, res) => {
    const cart = await Cart.findByIdAndRemove(req.params.id)
    res.send(cart);
});

module.exports = router;