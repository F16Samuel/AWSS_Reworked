import os
import subprocess

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")

def reassemble_chunks():
    bio_chunks = sorted([f for f in os.listdir(MODEL_DIR) if f.startswith("layer2bio_")])
    non_chunks = sorted([f for f in os.listdir(MODEL_DIR) if f.startswith("layer2non_")])

    bio_target = os.path.join(MODEL_DIR, "layer2bio_cnn.keras")
    non_target = os.path.join(MODEL_DIR, "layer2non_cnn.keras")

    # Reassemble only if not already present
    if not os.path.exists(bio_target):
        with open(bio_target, 'wb') as wfd:
            for chunk in bio_chunks:
                with open(os.path.join(MODEL_DIR, chunk), 'rb') as fd:
                    wfd.write(fd.read())
        print("✅ Reconstructed layer2bio_cnn.keras")

    if not os.path.exists(non_target):
        with open(non_target, 'wb') as wfd:
            for chunk in non_chunks:
                with open(os.path.join(MODEL_DIR, chunk), 'rb') as fd:
                    wfd.write(fd.read())
        print("✅ Reconstructed layer2non_cnn.keras")

if __name__ == "__main__":
    reassemble_chunks()