// routes/classify.js
import express from "express";
import upload from "../middleware/upload.js";
import Classification from "../models/Classification.js";

const router = express.Router();

// Dummy classifier (replace with your model later)
const classifyImage = async (filePath) => {
  // Simulate a prediction
  return {
    category: "Recyclable",
    confidence: Math.random(), // Mock confidence
  };
};

router.post("/", upload.single("image"), async (req, res) => {
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
    // Log the saved classification
    console.log("✅ Classification saved:", result);
    
    res.status(200).json({
      success: true,
      category: result.category,
      confidence: result.confidence,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Classification failed", error: err.message });
  }
});

export default router;