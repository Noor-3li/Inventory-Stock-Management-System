const Category = require("../models/Category");

// GET categories (all roles)
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE category (Admin only)
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const category = await Category.create({ name });
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE category (Admin only)
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category updated", category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE category (Admin only)
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};