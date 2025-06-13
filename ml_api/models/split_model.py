import os

def split_file(input_path, output_prefix, chunk_size_mb=70):
    chunk_size = chunk_size_mb * 1024 * 1024  # Convert MB to bytes
    with open(input_path, 'rb') as f:
        i = 0
        while chunk := f.read(chunk_size):
            with open(f"{output_prefix}_{i:02d}", 'wb') as chunk_file:
                chunk_file.write(chunk)
            print(f"Created {output_prefix}_{i:02d}")
            i += 1

if __name__ == "__main__":
    split_file("layer2bio_cnn.keras", "layer2bio")
    split_file("layer2non_cnn.keras", "layer2non")