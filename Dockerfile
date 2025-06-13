# Stage 1: Build React frontend
FROM node:18 AS frontend-builder

WORKDIR /app

# Copy only necessary frontend files first (for better caching)
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY postcss.config.js ./
COPY tailwind.config.ts ./
COPY public ./public
COPY src ./src
COPY index.html ./

# Install and build
RUN npm install && npm run build

# --------------------------------------
# 🚨 Stage 2: Setup full backend with ML API and serve frontend
FROM python:3.10-slim

# 🚫 PROBLEM AREA: Missing `procps` package for PM2 to use `ps`
# Without `ps`, PM2 can't track or kill child processes correctly

# ✅ FIXED: Add `procps` to ensure PM2 can function properly
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    procps \
 && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
 && apt-get install -y nodejs \
 && npm install -g pm2 \
 && apt-get clean

# Create app directory
WORKDIR /app

# Copy backend and ML API
COPY ./backend ./backend
COPY ./ml_api ./ml_api

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install ML API Python dependencies
WORKDIR /app/ml_api
COPY ./ml_api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy frontend build from previous stage
WORKDIR /app
COPY --from=frontend-builder /app/dist ./frontend/dist

# PM2 config file
COPY ecosystem.config.js .

# Expose backend port
EXPOSE 10000

CMD ["pm2-runtime", "ecosystem.config.js"]