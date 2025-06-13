from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import uvicorn
from ModelMain import classify_image  # Replace with your model loading + prediction
from dotenv import load_dotenv
import os

# Load from .env in current directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

fastserver = os.getenv("FAST_SERVER")
nodeserver = os.getenv("NODE_SERVER")
viteserver = os.getenv("VITE_SERVER")

app = FastAPI()

# CORS (optional if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["FASTSERVER","NODESERVER","VITESERVER"],
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