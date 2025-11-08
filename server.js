import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// ✅ 1. Manual CORS Handler (Render + Vercel compatible)
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://task-sphere-frontend-indol.vercel.app",
    "http://localhost:5173",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // ✅ Important: Handle preflight requests instantly
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// ✅ 2. Middleware
app.use(express.json());

// ✅ 3. Health Check
app.get("/", (req, res) => {
  res.send("✅ TaskSphere Backend is running successfully!");
});

// ✅ 4. MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ 5. Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ 6. Fallback for Invalid Routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
