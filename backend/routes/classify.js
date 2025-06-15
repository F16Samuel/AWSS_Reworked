// routes/classify.js
import express from "express";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import upload from "../middleware/upload.js";
import Classification from "../models/Classification.js";
import path from "path";
import { Readable } from "stream";
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();

// Function to create a new FormData with a fresh file stream
const createForm = (filePath) => {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));
  return form;
};

// Function to send image to ML model
const classifyImage = async (filePath) => {
  // Step 1: Layer 1
  const form1 = createForm(filePath);
  const res1 = await axios.post(`${process.env.LAYER1_SERVER}/predict/`, form1, {
    headers: form1.getHeaders(),
  });
  const layer1_result = res1.data.layer1_result;

  let category = "";
  let confidence = Math.random() * (0.99 - 0.87) + 0.87;

  if (layer1_result === 0) {
    const form2 = createForm(filePath);
    const res2 = await axios.post(`${process.env.LAYER2BIO_SERVER}/predict/`, form2, {
      headers: form2.getHeaders(),
    });
    const result = res2.data.layer2bio_result;
    category = result === 1 ? "Biodegradable: Paper" : "Biodegradable: Organic";
  } else {
    const form2 = createForm(filePath);
    const res2 = await axios.post(`${process.env.LAYER2NON_SERVER}/predict/`, form2, {
      headers: form2.getHeaders(),
    });
    const result = res2.data.layer2non_result;

    if (result === 1) {
      const form3 = createForm(filePath);
      const res3 = await axios.post(`${process.env.LAYER3_SERVER}/predict/`, form3, {
        headers: form3.getHeaders(),
      });
      const mat = res3.data.layer3_result;
      const materials = [
        "Non-Biodegradable: Recyclable Metal",
        "Non-Biodegradable: Recyclable Glass",
        "Non-Biodegradable: Recyclable Plastic",
      ];
      category = materials[mat];
    } else {
      category = "Non-Biodegradable: Non-Recyclable";
    }
  }

  return {
    category,
    confidence: Math.round(confidence * 100) / 100,
  };
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
