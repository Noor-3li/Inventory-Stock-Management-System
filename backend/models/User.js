const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "manager", "employee"], // ✅ Added "employee" role
    default: "manager",
  },
});

// Hash password before save
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Compare password method
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// ✅ Fix OverwriteModelError
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
