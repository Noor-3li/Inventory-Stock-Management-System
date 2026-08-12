const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Not authorized, token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "Not authorized, user not found" });

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

// Role-based authorization
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied: insufficient permissions" });
  }
  next();
};