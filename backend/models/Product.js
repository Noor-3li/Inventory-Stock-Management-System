const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  quantity: { type: Number, default: 0 },
  lowStockLevel: { type: Number, default: 5 }
});

module.exports = mongoose.model("Product", productSchema);