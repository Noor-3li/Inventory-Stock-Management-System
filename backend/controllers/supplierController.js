const Supplier = require("../models/Supplier");

// GET all suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE supplier (ADMIN only)
exports.createSupplier = async (req, res) => {
  try {
    const { name, contact } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const supplier = await Supplier.create({ name, contact });
    res.status(201).json(supplier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE supplier (ADMIN only)
exports.updateSupplier = async (req, res) => {
  try {
    const { name, contact } = req.body;

    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { name, contact },
      { new: true }
    );

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.json(supplier);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE supplier (ADMIN only)
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json({ message: "Supplier deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};