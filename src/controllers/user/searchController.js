const express = require("express");
const Product = require("../../models/Product");

const search = async (req, res) => {
    const searchQuery = req.query.q;
    const result = await Product.find({$or:[
        {$and:[{ title: {$regex: searchQuery, $options: "i" }}]},
        {$and:[{ description:{$regex: searchQuery, $options:"i"}}]}
    ]
}) 
    .sort("price");
    res.send(result)
    console.log(result)
};

module.exports = {search};