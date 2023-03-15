const Product = require("../../models/Product");

const getProduct = async (req, res) => {
    const product = await Product.find();
    res.send(product)
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("The product with the given ID does not exist");
    res.send(product);
};

module.exports = {
    getProduct,
    getProductById
}