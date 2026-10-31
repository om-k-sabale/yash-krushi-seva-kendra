const protect = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

const {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
// Add a new product
router.post("/", protect, addProduct);
router.get("/", getProducts);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
