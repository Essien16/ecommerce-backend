const { required } = require("joi");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    items: {
      type: [{
        productId: String,
        quantity: Number,
        title: String,
        price: Number
      }],
      default: []
    },
    active: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;