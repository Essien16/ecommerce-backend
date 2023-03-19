const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;