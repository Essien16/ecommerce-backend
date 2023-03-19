const express = require("express");
const Cart = require("../../models/Cart");
const CartItem = require("../../models/CartItem");

const createCart = async (req, res) => {
    const { productId, quantity, title, price } = req.body;
  
    try {
        const userId = req.user.id
        // console.log(userId)
        let cart = await Cart.findOne({ userId });
  
        if (cart) {
            let index = cart.items.findIndex((product) => product.productId == productId);
  
        if (index > -1) {
            //  cart.items[index].quantity += quantity;
            cart.items[index].quantity = quantity;
        } else {
            cart.items.push({ productId, quantity, title, price });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
            const newCart = await Cart.create({
            userId,
            products: [{ productId, title, quantity, price }]
        });
        return res.status(201).send(newCart);
      }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error.");
    }
};

const getCart = async (req,res) => {
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId);
    const cartItems = cart.items;
    try {
        // let totalPrice = 0;
        // for (let i = 0; i < cart.items.length; i++) {
        // let product = cart.items[i];
        // totalPrice += product.quantity * product.price;
        // }
        const totalPrice = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
          }, 0);
        res.status(200).send({cartItem: cartItems, totalPrice: totalPrice})
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      }
};

const deleteCart = async (req, res) => {
    const { cartId } = req.params;
    const cart = await Cart.findByIdAndRemove(cartId);
    res.send(cart);
};

const removeItem = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { itemId } = req.params;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        cart.items = cart.items.filter(item => item._id.toString() !== itemId); 
        await cart.save();
        res.send(cart);
    } catch (err) {
        console.error(err);
        res.status(400).send('Bad request');
    }
};

module.exports = {createCart, getCart, deleteCart, removeItem};