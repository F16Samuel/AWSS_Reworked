from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import uvicorn
import os
import ModelMain  # Replace with your model loading + prediction

app = FastAPI()

# CORS (optional if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://localhost:8080", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/classify")
async def classify_image(image: UploadFile = File(...)):
    # Save uploaded image temporarily
    temp_path = f"temp/{image.filename}"
    os.makedirs("temp", exist_ok=True)
    with open(temp_path, "wb") as f:
        shutil.copyfileobj(image.file, f)

    # Predict using your model
    category, confidence = ModelMain.predict(temp_path)

    return {
        "category": category,
        "confidence": confidence,
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
