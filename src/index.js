const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const product = require("./routes/product");
const login = require("./routes/login");
const cart = require("./routes/cart");
const dotenv = require("dotenv");
dotenv.config();

const db = process.env.MONGOLAB_URL
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Database connected'))
.catch(error => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use("/api/products", product);
app.use("/", login);
app.use("/cart", cart);


if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    console.log("Morgan enabled....")
};

const port = process.env.PORT || 7000;
app.listen(port, console.log(`Port activated at port ${port}`));