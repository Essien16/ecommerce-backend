const express = require("express");
const app = express();
const mongoose = require("mongoose");
const product = require("./routes/product")
const dotenv = require("dotenv");
dotenv.config();

const db = process.env.MONGOLAB_URL
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Database connected'))
.catch(error => console.log(error));

app.use(express.json())
app.use("/api/products", product);


const port = process.env.PORT || 7000;
app.listen(port, console.log(`Port activated at port ${port}`));