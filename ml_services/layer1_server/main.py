from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn as nn
from torchvision import models, transforms
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

# Load model
model = models.resnet50(pretrained=False)
model.fc = nn.Linear(2048, 2)
model.load_state_dict(torch.load("model/layer1cnn_aanan.pth", map_location=torch.device("cpu")))
model.eval()

# CORS (optional)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def preprocess_image(image_bytes):
    transform = transforms.Compose([
        transforms.Resize((150, 150)),
        transforms.ToTensor(),
    ])
    img = Image.open(BytesIO(image_bytes)).convert("RGB")
    return transform(img).unsqueeze(0)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    input_tensor = preprocess_image(image_bytes)
    with torch.no_grad():
        output = model(input_tensor)
        prediction = torch.argmax(output, dim=1).item()
        print("RESULT TYPE:", type(prediction), "VALUE:", prediction)
    return {"layer1_result": int(prediction)}

# ✅ Health check route
@app.get("/")
def read_root():
    return {"message": "Backend is up and running."}

# Optional: if you want to use `/api` or `/healthz`
@app.get("/api")
def health_check():
    return {"status": "ok"}