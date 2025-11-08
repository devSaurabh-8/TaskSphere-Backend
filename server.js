import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// ✅ Enable CORS for Vercel frontend
app.use(
  cors({
    origin: [
      "https://task-sphere-frontend-indol.vercel.app", // your Vercel domain
      "http://localhost:5173", // local testing
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ TaskSphere Backend is running successfully!");
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
