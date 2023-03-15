const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");


router.post("/cart", async (req, res) => {
    const { productId, quantity } = req.body;
    const cartItem = new CartItem({
        product: productId,
        quantity,
    });
  
    try {
        const userId = req.headers['x-user-id'];
        console.log(userId)
        let cart = await Cart.findOne({ userId });
  
        if (cart) {
            let index = cart.items.findIndex((cartItem) => cartItem.productId === productId);
  
        if (index !== -1) {
            cart.items[index].quantity += quantity;
        } else {
            cart.items.push(cartItem);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
            const newCart = await Cart.create({
            userId,
            products: [{ productId, quantity }]
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
        console.log(err);
        res.status(500).send("There is an error.");
    }
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