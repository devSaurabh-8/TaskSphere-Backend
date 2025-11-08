import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI?.trim();
    console.log("Mongo URI =>", uri);

    if (!uri) throw new Error(" No Mongo URI found");

    mongoose.set("strictQuery", true);

    await mongoose.connect(uri, {
      dbName: process.env.MONGO_DB || "tasksphere",
      serverApi: { version: "1", strict: true, deprecationErrors: true },
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log(" MongoDB Connected Successfully");
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  }
};
