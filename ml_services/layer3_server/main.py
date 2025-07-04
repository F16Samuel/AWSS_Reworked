# ml_services/layer2bio_server/main.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
import os

# Load from .env in current directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

nodeserver = os.getenv("NODE_SERVER")
viteserver = os.getenv("VITE_SERVER")
mongoserver = os.getenv("MONGO_URI")

app = FastAPI()

model = load_model("model/layer3_cnn.keras")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

def preprocess(image_bytes):
    img = Image.open(BytesIO(image_bytes)).convert("RGB")
    img = img.resize((128, 128))
    arr = np.array(img) / 255.0
    return arr.reshape(1, 128, 128, 3)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    arr = preprocess(contents)
    pred = np.argmax(model.predict(arr))
    print("RESULT TYPE:", type(pred), "VALUE:", pred)
    return {"layer3_result": int(pred)}

# ✅ Health check route
@app.get("/")
def read_root():
    return {"message": "Backend is up and running."}

# Optional: if you want to use `/api` or `/healthz`
@app.get("/api")
def health_check():
    return {"status": "ok"}