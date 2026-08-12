const express = require("express");
const User = require("../models/User");
const { protect, authorize } = require("../middleware/authmiddleware");

const router = express.Router();

/* =========================
   GET ALL USERS (ADMIN)
========================= */
router.get("/", protect, authorize("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   CREATE USER (ADMIN)
========================= */
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });
    const { password: _, ...rest } = user._doc;
    res.status(201).json(rest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   UPDATE USER (ADMIN)
========================= */
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    const { password, ...rest } = user._doc; // exclude password
    res.json(rest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   DELETE USER (ADMIN)
========================= */
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;