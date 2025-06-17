import express from 'express';
import cors from 'cors';
import classifyRoutes from "./routes/classify.js"; 
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI; // your mongo URI

// CORS middleware
app.use(cors());
app.use(express.json());

// ✅ Health check route (root)
app.get("/", (req, res) => {
  res.status(200).json({ message: "Node.js backend is running." });
});

// ✅ Optional: separate API check route
app.get("/api", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(cors({
  origin: `${process.env.VITE_SERVER}`, // or your frontend URL
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use("/api/classify", classifyRoutes);
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default app;
