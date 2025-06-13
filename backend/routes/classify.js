// routes/classify.js
import express from "express";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import upload from "../middleware/upload.js";
import Classification from "../models/Classification.js";
import path from "path";
import { Readable } from "stream";

const router = express.Router();

// Optional helper (currently unused)
const waitForFile = async (filePath) => {
  const maxTries = 10;
  const delay = 100; // ms
  for (let i = 0; i < maxTries; i++) {
    try {
      await fs.promises.access(filePath);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("File not ready in time");
};

// Function to send image to ML model
const classifyImage = async (filePath) => {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));

  const response = await axios.post("http://localhost:8000/classify/", form, {
    headers: form.getHeaders(),
  });

  return response.data; // { category: "...", confidence: ... }
};

// POST route for classification
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const prediction = await classifyImage(req.file.path);

    console.log("📥 Saving classification:", {
      filename: req.file.filename,
      category: prediction.category,
      confidence: prediction.confidence,
    });

    const result = new Classification({
      filename: req.file.filename,
      category: prediction.category,
      confidence: prediction.confidence,
    });

    await result.save();
    console.log("✅ Classification saved:", result);

    res.status(200).json({
      success: true,
      category: result.category,
      confidence: result.confidence,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Classification failed", error: err.message });
  }
});

export default router;
