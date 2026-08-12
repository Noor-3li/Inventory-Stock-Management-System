const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();



const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,               // REQUIRED FOR COOKIES
  })
);

/* ===== ROUTES ===== */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/users", require("./routes/user.routes"));
/* ===== DB + SERVER ===== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () =>
      console.log("Server running on http://localhost:5000")
    );
  })
  .catch((err) => console.error(err));