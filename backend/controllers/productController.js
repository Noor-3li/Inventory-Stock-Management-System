const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("supplier");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

exports.stockIn = async (req, res) => {
  const { quantity } = req.body;
  const product = await Product.findById(req.params.id);
  product.quantity += quantity;
  await product.save();
  res.json(product);
};

exports.stockOut = async (req, res) => {
  const { quantity } = req.body;
  const product = await Product.findById(req.params.id);
  product.quantity = Math.max(product.quantity - quantity, 0);
  await product.save();
  res.json(product);
};