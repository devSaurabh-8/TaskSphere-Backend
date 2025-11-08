import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// ✅ Step 1: Manual full CORS handler
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://task-sphere-frontend-indol.vercel.app", // your vercel app
    "http://localhost:5173", // for local testing
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

  // ✅ Must handle preflight OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// ✅ Step 2: Middleware
app.use(express.json());

// ✅ Step 3: Root test
app.get("/", (req, res) => {
  res.send("✅ TaskSphere Backend is running successfully!");
});

// ✅ Step 4: MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Step 5: Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ Step 6: 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Step 7: Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
