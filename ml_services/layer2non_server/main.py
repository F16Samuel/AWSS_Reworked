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

# Reconstructing models
from model.reconstruct_models import reassemble_chunks
reassemble_chunks()

# Auto-convert .keras model to .tflite if not exists
keras_model_path = "model/layer2non_cnn.keras"
tflite_model_path = "model/layer2non_cnn.tflite"

if not os.path.exists(tflite_model_path):
    print("⚙️ Converting .keras to .tflite ...")
    model = tf.keras.models.load_model(keras_model_path)
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    tflite_model = converter.convert()
    with open(tflite_model_path, "wb") as f:
        f.write(tflite_model)
    print("✅ Model converted and saved as .tflite")

# Load the TFLite model
interpreter = tf.lite.Interpreter(model_path=tflite_model_path)
interpreter.allocate_tensors()

input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

app = FastAPI()

model = load_model("model/layer2non_cnn.tflite")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

def preprocess(image_bytes):
    img = Image.open(BytesIO(image_bytes)).convert("RGB")
    img = img.resize((150, 150))
    arr = np.array(img) / 255.0
    return arr.reshape(1, 150, 150, 3)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    arr = preprocess(contents)
    pred = np.argmax(model.predict(arr))
    print("RESULT TYPE:", type(pred), "VALUE:", pred)
    return {"layer2non_result": int(pred)}