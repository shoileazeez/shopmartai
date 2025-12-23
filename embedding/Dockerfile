# Base image with Python
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install system dependencies for Pillow and Torch
RUN apt-get update && \
    apt-get install -y git curl build-essential libgl1 && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy FastAPI code
COPY . .

# Expose port
EXPOSE 8001

# Command to run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
