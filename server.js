import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import https from "https";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// 🌐 Keep Render awake
setInterval(() => {
  https.get("https://tasksphere-backend-v2zt.onrender.com");
  console.log("💡 Keep-alive ping sent to Render");
}, 14 * 60 * 1000); // every 14 minutes

// ✅ CORS Configuration (Vercel + Local)
app.use(
  cors({
    origin: [
      "https://task-sphere-frontend-indol.vercel.app", // Production frontend
      "http://localhost:5173", // Local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Parse JSON
app.use(express.json());

// ✅ Health route (Render check)
app.get("/", (req, res) => {
  res.status(200).send("✅ TaskSphere Backend is running successfully!");
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ Catch-all route (safety)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
