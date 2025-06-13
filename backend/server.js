// server.js (ES Module compatible)

import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app.js'; // Assuming app.js exports a configured Express app

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error("MongoDB connection error:", err));
