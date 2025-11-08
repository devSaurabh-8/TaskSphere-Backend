import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// ✅ Step 1: CORS middleware — handles OPTIONS & credentials correctly
const allowedOrigins = [
  "https://task-sphere-frontend-indol.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Step 2: Express middleware
app.use(express.json());

// ✅ Step 3: Handle preflight requests manually (Render needs this)
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.sendStatus(200);
});

// ✅ Step 4: MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err.message));

// ✅ Step 5: Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ Step 6: Root route
app.get("/", (req, res) => {
  res.send("🚀 TaskSphere backend running successfully!");
});

// ✅ Step 7: Handle unknown routes
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// ✅ Step 8: Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
