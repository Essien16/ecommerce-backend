const Joi = require("joi");
const Product = require("../../models/Product");
const Collection = require("../../models/Collection");

const postProduct = async (req, res) => {
    try {
        const { error } = validateProduct(req.body);
        if (error) return res.status(400).send(details[0].message);
        const category = await Collection.findById(req.body.category);
        if (!category) {
          return res.status(404).send('The category with the given ID was not found.');
        }
        let product = new Product({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            inventory: req.body.inventory,
            category: req.body.category
        });
        product = await product.save();
        category.products.push(product._id);
        await category.save();
        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while adding the product to the database.');
    }
};

const updateProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(details[0].message);

    const product = await Product.findByIdAndUpdate(req.params.id, {title: req.body.title, price: req.body.price, description: req.body.description, inventory: req.body.inventory, category: req.body.category}, {new: true});
    if (!product) return res.status(404).send("The product with the given ID does not exist");

    res.send(product)
};

const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) return res.status(404).send("The Product with the given ID does not exist");

    res.send(product);
};

const collections = async (req, res) => {
    const { error } = validateCollection(req.body);
    if (error) return res.status(400).send("There is an error");

    let category = new Collection({
        category: req.body.category
    });
    category = await category.save();
    res.send(category);
};

const getCollections = async (req, res) => {
    const category = await Collection.find();
    res.send(category);
};

const getCollectionsById = async (req, res) => {
    const category = await Collection.findById(req.params.id).populate("products").exec();
    if (!category) return res.status(404).send("The collection with the given ID does not exist");
    res.send(category)
};


function validateProduct(product) {
    const schema = Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string(),
        inventory: Joi.number(),
        category: Joi.string().required()
    });
    return schema.validate(product);
};

function validateCollection(collection) {
    const schema = Joi.object({
        category: Joi.string().required()
    });
    return schema.validate(collection)
};

module.exports = {
    postProduct,
    updateProduct,
    deleteProduct,
    collections,
    getCollections,
    getCollectionsById
}