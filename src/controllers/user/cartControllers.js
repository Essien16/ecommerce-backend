const express = require("express");
const Cart = require("../../models/Cart");
const CartItem = require("../../models/CartItem");

const createCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const cartItem = new CartItem({
        product: productId,
        quantity,
    });
  
    try {
        const userId = req.user.id
        // console.log(userId)
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
};

const getCart = async (req,res) => {
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId);
    res.send(cart);
};

const deleteCart = async (req, res) => {
    const { cartId } = req.params;
    const cart = await Cart.findByIdAndRemove(cartId);
    res.send(cart);
};

const removeItem = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { itemId } = req.body;
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