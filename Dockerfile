# Stage 1: Build frontend
FROM node:18 as frontend-builder
WORKDIR /app
RUN npm install && npm run build

# Stage 2: Main container
FROM python:3.10-slim

# Install Node.js
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && apt-get clean

# Set working directory
WORKDIR /app

# Copy backend and ML API
COPY ./backend ./backend
COPY ./ml_api ./ml_api

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install Python dependencies
WORKDIR /app/ml_api
RUN pip install --no-cache-dir -r requirements.txt

# Copy frontend build output into a directory inside the container
COPY --from=frontend-builder /app/dist /app/dist

# Install PM2
RUN npm install pm2 -g

# Copy ecosystem config for PM2
WORKDIR /app
COPY ecosystem.config.js .

EXPOSE 5000
CMD ["pm2-runtime", "ecosystem.config.js"]
