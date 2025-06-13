// models/Classification.js
import mongoose from "mongoose";

const classificationSchema = new mongoose.Schema({
  filename: String,
  category: String,
  confidence: Number,
  image: {
    data: Buffer,            // Binary image data
    contentType: String      // MIME type (e.g., 'image/png')
  },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook to enforce limit of 25 entries
classificationSchema.pre("save", async function (next) {
  const Classification = mongoose.model("Classification");

  const count = await Classification.countDocuments();
  if (count >= 25) {
    const oldest = await Classification.find().sort({ createdAt: 1 }).limit(4);
    const idsToDelete = oldest.map(doc => doc._id);
    await Classification.deleteMany({ _id: { $in: idsToDelete } });
  }

  next();
});

const Classification = mongoose.model("Classification", classificationSchema);
export default Classification;
