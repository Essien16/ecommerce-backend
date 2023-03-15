const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { signUpAdmin, loginAdmin } = require("../controllers/admin/authController");
const { isAdmin } = require("../middleware/protect");
const { postProduct, updateProduct, deleteProduct } = require("../controllers/admin/adminController");

router.post("/api/products", isAdmin, postProduct);
router.put("/api/products/:id", isAdmin, updateProduct);
router.delete("/api/prducts/:id", isAdmin, deleteProduct);
router.post("/admin/signup", signUpAdmin);
router.post("/admin", loginAdmin);


module.exports = router;