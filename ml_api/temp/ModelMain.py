# Example dummy logic — replace with your ML model
# def predict(image_path):
#    import random
#    return "Recyclable", random.uniform(0.87, 0.99)

from tensorflow.keras.models import load_model
import numpy as np
import cv2
from io import BytesIO
from PIL import Image
import random

# Load pre-trained models
layer1 = load_model('models/layer1_cnn.keras')
layer2_bio = load_model('models/layer2bio_cnn.keras')
layer2_nonbio = load_model('models/layer2non_cnn.keras')
layer3 = load_model('models/layer3_cnn.keras')

def preprocess_image(image_bytes, size=(150, 150)):
    img = Image.open(BytesIO(image_bytes)).convert('RGB')  # ensure 3 channels
    img = img.resize(size)  # dynamically resize based on layer
    arr = np.array(img) / 255.0   # normalize
    arr = arr.reshape((1, size[0], size[1], 3))  # batch shape
    return arr

def classify_image(image_bytes):
    # Layer 1 expects 150x150
    arr = preprocess_image(image_bytes, size=(150, 150))
    l1_pred = np.argmax(layer1.predict(arr))

    if l1_pred == 0:
        # Layer 2 Bio also expects 150x150
        arr = preprocess_image(image_bytes, size=(150, 150))
        l2_pred = np.argmax(layer2_bio.predict(arr))
        category = "Biodegradable: Paper" if l2_pred == 1 else "Biodegradable: Organic"
    else:
        # Layer 2 Non-Bio also expects 150x150
        arr = preprocess_image(image_bytes, size=(150, 150))
        l2_pred = np.argmax(layer2_nonbio.predict(arr))

        if l2_pred == 1:
            # Layer 3 expects 128x128
            arr = preprocess_image(image_bytes, size=(128, 128))
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
