import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; // make sure your route file name matches this
import userRoutes from "./routes/userRoutes.js"; // optional, if you have separate user routes

// Initialize app
const app = express();
dotenv.config();

// Connect MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://task-sphere-frontend-indol.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🚀 TaskSphere Backend running successfully!");
});

app.use("/api/auth", authRoutes); // <-- Register/Login routes
// If you have other routes like CRUD:
app.use("/api/users", userRoutes); // optional

// Handle 404 (wrong routes)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
