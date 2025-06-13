# Base image with Python + minimal setup
FROM python:3.10-slim

# Set working directory inside container
WORKDIR /code

# Copy only requirements first to install dependencies
COPY ml_api/requirements.txt .

# Install system dependencies and Python packages
RUN apt-get update && apt-get install -y \
    gcc \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Now copy the entire app code
COPY ml_api/ .

# Expose port used by Hugging Face Spaces (default: 7860)
EXPOSE 7860

# Run FastAPI with Uvicorn on the correct port
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
