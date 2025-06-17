from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

nodeserver = os.getenv("NODE_SERVER")
viteserver = os.getenv("VITE_SERVER")
mongoserver = os.getenv("MONGO_URI")

# Reconstructing model chunks
from model.reconstruct_models import reassemble_chunks
reassemble_chunks()

# Paths to model files
keras_model_path = "model/layer2non_cnn.keras"
tflite_model_path = "model/layer2non_cnn.tflite"

# Auto-convert .keras to .tflite if needed
if not os.path.exists(tflite_model_path):
    print("⚙️ Converting .keras to .tflite ...")
    model = tf.keras.models.load_model(keras_model_path)
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    tflite_model = converter.convert()
    with open(tflite_model_path, "wb") as f:
        f.write(tflite_model)
    print("✅ Model converted and saved as .tflite")

# Load TFLite model
interpreter = tf.lite.Interpreter(model_path=tflite_model_path)
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Setup FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace with [viteserver] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Image preprocessing
def preprocess(image_bytes):
    img = Image.open(BytesIO(image_bytes)).convert("RGB")
    img = img.resize((150, 150))
    arr = np.array(img) / 255.0
    return arr.astype(np.float32).reshape(1, 150, 150, 3)

# Prediction route
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    arr = preprocess(contents)
    interpreter.set_tensor(input_details[0]['index'], arr)
    interpreter.invoke()
    output = interpreter.get_tensor(output_details[0]['index'])
    pred = int(np.argmax(output))
    print("PREDICTION:", pred)
    return {"layer2non_result": pred}

# ✅ Health check route
@app.get("/")
def read_root():
    return {"message": "Backend is up and running."}

# Optional: if you want to use `/api` or `/healthz`
@app.get("/api")
def health_check():
    return {"status": "ok"}