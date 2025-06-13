import express from 'express';
import cors from 'cors';
import classifyRoutes from "./routes/classify.js"; 
import mongoose from 'mongoose';
import dotenv from "dotenv";
import imageRoutes from './routes/imagesearch.js';

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/awss"; // replace with your actual URI

app.use(cors({
  origin: 'http://localhost:8080', // or your frontend URL
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use('/api/images', imageRoutes);
app.use("/api/classify", classifyRoutes);
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default app;
