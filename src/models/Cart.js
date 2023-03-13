const { required } = require("joi");
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      products: [
        {
          productId: Number,
          quantity: Number,
          name: String,
          price: Number
        }
      ],
      createdAt: {
        type: Date,
        default: Date.now
      }
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;