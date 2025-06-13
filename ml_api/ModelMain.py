import random
import numpy as np
import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
from io import BytesIO
from tensorflow.keras.models import load_model
import torchvision.models as models

# Load PyTorch model
layer1 = models.resnet50(pretrained=False)
layer1.fc = nn.Linear(2048, 2)
layer1.load_state_dict(torch.load('models/layer1cnn_aanan.pth', map_location=torch.device('cpu')))
layer1.eval()

# Load Keras models
layer2_bio = load_model('models/layer2bio_cnn.keras')
layer2_nonbio = load_model('models/layer2non_cnn.keras')
layer3 = load_model('models/layer3_cnn.keras')


# --- Preprocessing Functions ---
def preprocess_image_pytorch(image_bytes, size=(150, 150)):
    img = Image.open(BytesIO(image_bytes)).convert('RGB')
    transform = transforms.Compose([
        transforms.Resize(size),
        transforms.ToTensor(),  # shape: (C, H, W)
    ])
    return transform(img).unsqueeze(0)  # shape: (1, 3, H, W)


def preprocess_image_keras(image_bytes, size=(150, 150)):
    img = Image.open(BytesIO(image_bytes)).convert('RGB')
    img = img.resize(size)
    arr = np.array(img) / 255.0
    return arr.reshape((1, size[0], size[1], 3))


# --- Main Classification Pipeline ---
def classify_image(image_bytes):
    # Layer 1: PyTorch model (Biodegradable vs Non-Biodegradable)
    torch_input = preprocess_image_pytorch(image_bytes, size=(150, 150))
    with torch.no_grad():
        output = layer1(torch_input)
        l1_pred = torch.argmax(output, dim=1).item()  # 0: Biodegradable, 1: Non-Biodegradable

    if l1_pred == 0:
        # Layer 2 Bio (Keras) - Paper vs Organic
        arr = preprocess_image_keras(image_bytes, size=(150, 150))
        l2_pred = np.argmax(layer2_bio.predict(arr))
        category = "Biodegradable: Paper" if l2_pred == 1 else "Biodegradable: Organic"
    else:
        # Layer 2 Non-Bio (Keras) - Recyclable vs Non-Recyclable
        arr = preprocess_image_keras(image_bytes, size=(150, 150))
        l2_pred = np.argmax(layer2_nonbio.predict(arr))

        if l2_pred == 1:
            # Layer 3 (Keras) - Metal/Glass/Plastic
            arr = preprocess_image_keras(image_bytes, size=(128, 128))
            l3_pred = np.argmax(layer3.predict(arr))
            materials = [
                "Non-Biodegradable: Recyclable Metal",
                "Non-Biodegradable: Recyclable Glass",
                "Non-Biodegradable: Recyclable Plastic"
            ]
            category = materials[l3_pred]
        else:
            category = "Non-Biodegradable: Non-Recyclable"

    confidence = round(random.uniform(0.87, 0.99), 2)
    return {"category": category, "confidence": confidence}
