// server.js (ES Module compatible)

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app.js'; // Assuming app.js exports a configured Express app

dotenv.config();

const PORT = process.env.PORT || 5000;

// If app.js does NOT include these middlewares/routes, uncomment below
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));
// app.use("/api/classify", classifyRoutes);

// Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/awss", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error("MongoDB connection error:", err));
