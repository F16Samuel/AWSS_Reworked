from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import uvicorn
import os
from ModelMain import classify_image  # Replace with your model loading + prediction


app = FastAPI()

# CORS (optional if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://localhost:8080", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/classify/")
async def classify(file: UploadFile = File(...)):
    contents = await file.read()
    result = classify_image(contents)
    return result

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
