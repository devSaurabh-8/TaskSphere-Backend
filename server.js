import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ auth routes (register/login)
// import userRoutes from "./routes/userRoutes.js"; // only if you actually have it

dotenv.config();

// Initialize app
const app = express();

// ✅ Connect MongoDB
connectDB();

// ✅ Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://task-sphere-frontend-indol.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Base route check
app.get("/", (req, res) => {
  res.send("🚀 TaskSphere Backend running successfully!");
});

// ✅ API routes
app.use("/api/auth", authRoutes); // register/login routes
// app.use("/api/users", userRoutes); // enable only if defined

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Global error handler (extra safety)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
