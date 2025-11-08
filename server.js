import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// ✅ Step 1: Correct CORS setup BEFORE any routes
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://task-sphere-frontend-indol.vercel.app",
    "http://localhost:5173",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // ✅ Handle OPTIONS preflight correctly
  if (req.method === "OPTIONS") {
    return res.status(200).send("Preflight OK");
  }

  next();
});

// ✅ Step 2: Middleware
app.use(express.json());

// ✅ Step 3: Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err.message));

// ✅ Step 4: Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ Step 5: Root route
app.get("/", (req, res) => {
  res.send("🚀 TaskSphere backend running successfully!");
});

// ✅ Step 6: Catch-all 404
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// ✅ Step 7: Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
