import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// ✅ Enable CORS for the frontend (Render + Vercel)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Parse JSON data
app.use(express.json());

// ✅ Basic health check route for Render
app.get("/", (req, res) => {
  res.status(200).send("✅ TaskSphere Backend is running successfully!");
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Main API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ Handle unknown routes (important for avoiding “Not Found” confusion)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
