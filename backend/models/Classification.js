// models/Classification.js
import mongoose from "mongoose";

const classificationSchema = new mongoose.Schema({
  filename: String,
  category: String,
  confidence: Number,
  createdAt: { type: Date, default: Date.now },
});

const Classification = mongoose.model("Classification", classificationSchema);

export default Classification;