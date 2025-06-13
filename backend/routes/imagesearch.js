import express from 'express';
import Classification from '../models/Classification.js';
import mongoose from 'mongoose';

const router = express.Router();

// GET: Serve image by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid image ID');
    }

    const classification = await Classification.findById(id);
    if (!classification || !classification.image || !classification.image.data) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', classification.image.contentType);
    res.send(classification.image.data);
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(500).send('Server error');
  }
});

export default router;
