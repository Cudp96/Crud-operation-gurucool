import express from "express";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("MongoDB is connected."))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server listening on port");
});

app.get("/", (req, res) => {
  res.send("IIt is working");
});
app.use(express.json());
app.use("/backend/auth", authRoutes);
app.use("/backend/product", productRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
