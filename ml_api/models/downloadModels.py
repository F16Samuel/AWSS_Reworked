import gdown
import os

# Destination folder
MODEL_DIR = os.path.join(os.path.dirname(__file__), ".")
files_to_download = {
    "layer1cnn_aanan.pth": "1R6Up_9vyd27hdRIyGXQgi86pn42tl-bh",
    "layer2bio_cnn.keras": "1mewJKVzhmOl_l-sVupK3OasyX_56OxjG",
    "layer2non_cnn.keras": "1IM6Y4ZduHE4JeDgJig362n-Y1tz6YKmB",
    "layer3_cnn.keras": "16DjttPx1f9sqWlodO5KqPyZBkpYVtVa4"
}

def download_all_models():
    for filename, file_id in files_to_download.items():
        dest_path = os.path.join(MODEL_DIR, filename)
        if not os.path.exists(dest_path):
            print(f"Downloading {filename}...")
            gdown.download(f"https://drive.google.com/uc?id={file_id}", dest_path, quiet=False)
        else:
            print(f"{filename} already exists, skipping.")

if __name__ == "__main__":
    download_all_models()