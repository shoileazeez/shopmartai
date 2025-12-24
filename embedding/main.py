from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
load_dotenv()

import torch
from transformers import AutoImageProcessor, AutoModel
from PIL import Image
import io
import math

app = FastAPI(title="Embedding API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------
# Hugging Face config
# ---------------------------------
HF_API_TOKEN = os.getenv("HF_API_TOKEN")
if not HF_API_TOKEN:
    raise RuntimeError("HF_API_TOKEN not set")

HEADERS_AUTH = {"Authorization": f"Bearer {HF_API_TOKEN}"}

# Text inference endpoint
TEXT_API_URL = "https://router.huggingface.co/hf-inference/models/intfloat/multilingual-e5-large/pipeline/feature-extraction"

# Image model (local DINOv2)
IMAGE_MODEL_NAME = "facebook/dinov2-small"
processor = AutoImageProcessor.from_pretrained(IMAGE_MODEL_NAME)
image_model = AutoModel.from_pretrained(IMAGE_MODEL_NAME)

# ---------------------------------
# Schema
# ---------------------------------
class EmbeddingRequest(BaseModel):
    type: str      # "text" | "image"
    content: str   # text or image URL

# ---------------------------------
# Helpers
# ---------------------------------
def embed_text(text: str):
    res = requests.post(
        TEXT_API_URL,
        headers=HEADERS_AUTH,
        json={"inputs": text},
        timeout=30,
    )
    if res.status_code != 200:
        raise HTTPException(500, res.text)
    return res.json()

def embed_image(image_url: str):
    try:
        img_bytes = requests.get(image_url, timeout=10).content
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        img = img.resize((224, 224))
    except Exception as e:
        raise HTTPException(400, f"Image download failed: {str(e)}")

    inputs = processor(images=img, return_tensors="pt")
    with torch.no_grad():
        outputs = image_model(**inputs)

    embedding = outputs.last_hidden_state.mean(dim=1).squeeze(0).tolist()

    # normalize vector
    norm = math.sqrt(sum(x*x for x in embedding))
    if norm > 0:
        embedding = [x / norm for x in embedding]

    return embedding

# ---------------------------------
# Endpoint
# ---------------------------------
@app.post("/embed")
def create_embedding(req: EmbeddingRequest):
    if req.type == "text":
        vector = embed_text(req.content)
        # Ensure vector is a list
        if isinstance(vector, float):
            vector = [vector]
    elif req.type == "image":
        vector = embed_image(req.content)
        # Ensure vector is a list
        if isinstance(vector, float):
            vector = [vector]
    else:
        raise HTTPException(400, "type must be 'text' or 'image'")

    return {
        "embedding": vector,
        "dimension": len(vector),
    }

