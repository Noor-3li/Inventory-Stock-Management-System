const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

// REGISTER
exports.register = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    role = role.toLowerCase();
    if (!["admin", "manager","employee"].includes(role))
      return res.status(400).json({ message: "Invalid role" });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.cookie("token", token, {
  httpOnly: true,
  secure: false,     // MUST be false in localhost
  sameSite: "lax",   // NOT strict
  maxAge: 24 * 60 * 60 * 1000,
}).json({
  message: "Login successful",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) })
     .json({ message: "Logged out successfully" });
};

// GET LOGGED-IN USER
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};