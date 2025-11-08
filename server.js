import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// ✅ Step 1: Enable CORS before anything else
const allowedOrigins = [
  "https://task-sphere-frontend-indol.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Step 2: Body parser
app.use(express.json());

// ✅ Step 3: Preflight OPTIONS route handler (important for Render)
app.options("*", cors());

// ✅ Step 4: MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err.message));

// ✅ Step 5: Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// ✅ Step 6: Default route
app.get("/", (req, res) => {
  res.send("🚀 TaskSphere Backend running successfully!");
});

// ✅ Step 7: Handle 404
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// ✅ Step 8: Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
