import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// ✅ Enable CORS for frontend (Vercel + Local)
app.use(
  cors({
    origin: [
      "https://task-sphere-frontend-indol.vercel.app", // your live frontend
      "http://localhost:5173", // for local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Parse incoming JSON data
app.use(express.json());

// ✅ Health route (Render uptime check)
app.get("/", (req, res) => {
  res.status(200).send("✅ TaskSphere Backend is running successfully!");
});

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Main API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ 404 fallback (safety)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
