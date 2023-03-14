const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require("./routes/user");
const admin = require("./routes/admin");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const db = process.env.MONGOLAB_URL
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Database connected'))
.catch(error => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(user);
app.use(admin);


if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    console.log("Morgan enabled....")
};

const port = process.env.PORT || 7000;
app.listen(port, console.log(`Port activated at port ${port}`));