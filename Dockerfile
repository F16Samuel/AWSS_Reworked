# Stage 1: Build frontend
FROM node:18 as frontend-builder
WORKDIR /app/frontend
COPY . ./
RUN cd frontend && npm install && npm run build

# Stage 2: Main container
FROM python:3.10-slim

# Install Node.js for backend
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && apt-get clean

# Set working dir
WORKDIR /app

# Copy backend and ML API
COPY backend/ /app/backend/
COPY ml_api/ /app/ml_api/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install Python ML API dependencies
WORKDIR /app/ml_api
RUN pip install --no-cache-dir -r requirements.txt

# Copy built frontend to backend (static hosting)
WORKDIR /app
COPY --from=frontend-builder /app/frontend/dist ./frontend

# Install PM2 to manage both backend and FastAPI
RUN npm install pm2 -g

# Create ecosystem.config.js
COPY ecosystem.config.js .

EXPOSE 5000
CMD ["pm2-runtime", "ecosystem.config.js"]
