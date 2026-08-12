const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  stockIn,
  stockOut
} = require("../controllers/productController");

const { protect, authorize } = require("../middleware/authmiddleware");

// Everyone logged in can view products
router.get("/", protect, authorize("admin", "manager", "employee"), getProducts);

// Admin + Manager can add/delete products
router.post("/", protect, authorize("admin", "manager"), createProduct);
router.put("/:id", protect, authorize("admin", "manager"), updateProduct);
router.delete("/:id", protect, authorize("admin", "manager"), deleteProduct);

// Stock management → Admin only
router.put("/stockin/:id", protect, authorize("admin"), stockIn);
router.put("/stockout/:id", protect, authorize("admin"), stockOut);

module.exports = router;