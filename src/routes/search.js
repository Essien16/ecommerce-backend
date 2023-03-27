const express = require("express");
const router = express.Router();
const {search} = require("../controllers/user/searchController");

router.get("/search", search);

module.exports = router;