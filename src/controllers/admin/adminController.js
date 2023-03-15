const Joi = require("joi");
const Product = require("../../models/Product");

const postProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(details[0].message);

    let product = new Product({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        inventory: req.body.inventory
    });
    product = await product.save();
    res.send(product);
};

const updateProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(details[0].message);

    const product = await Product.findByIdAndUpdate(req.params.id, {title: req.body.title, price: req.body.price, description: req.body.description, inventory: req.body.inventory}, {new: true});
    if (!product) return res.status(404).send("The product with the given ID does not exist");

    res.send(product)
};

const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).send("The Product with the given ID does not exist");

    res.send(product);
}



function validateProduct(product) {
    const schema = Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string(),
        inventory: Joi.number()
    });
    return schema.validate(product);
};

module.exports = {
    postProduct,
    updateProduct,
    deleteProduct
}