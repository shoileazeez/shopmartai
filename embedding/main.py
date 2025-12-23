from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from open_clip import create_model_and_transforms, tokenize
from PIL import Image
import requests
from io import BytesIO
from sentence_transformers import SentenceTransformer

device = "cuda" if torch.cuda.is_available() else "cpu"

app = FastAPI(title="Embedding API")

# -----------------------------
# CORS Middleware
# -----------------------------
# For deployment, replace "*" with your actual frontend URL
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://your-frontend-domain.com",  # your deployed frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # Allowed hosts
    allow_credentials=True,
    allow_methods=["*"],         # Allow all HTTP methods
    allow_headers=["*"],         # Allow all headers
)

# -----------------------------
# Load Models
# -----------------------------
clip_model, _, clip_preprocess = create_model_and_transforms('ViT-B-32', pretrained='openai')
clip_model.to(device)
clip_model.eval()

text_model = SentenceTransformer('all-MiniLM-L6-v2')

# -----------------------------
# Request Schema
# -----------------------------
class EmbeddingRequest(BaseModel):
    type: str  # "text" or "image"
    content: str  # text content or image URL
    model: str = "default"

# -----------------------------
# Utility Functions
# -----------------------------
def embed_text_openclip(text: str):
    tokens = tokenize([text]).to(device)
    with torch.no_grad():
        emb = clip_model.encode_text(tokens)
        emb = emb / emb.norm(dim=-1, keepdim=True)
    return emb.cpu().numpy()[0].tolist()

def embed_text_transformers(text: str):
    emb = text_model.encode(text, normalize_embeddings=True)
    return emb.tolist()

def embed_image(image_url: str):
    try:
        response = requests.get(image_url, timeout=5)
        image = Image.open(BytesIO(response.content)).convert("RGB")
        image = clip_preprocess(image).unsqueeze(0).to(device)
        with torch.no_grad():
            emb = clip_model.encode_image(image)
            emb = emb / emb.norm(dim=-1, keepdim=True)
        return emb.cpu().numpy()[0].tolist()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# -----------------------------
# Embedding Endpoint
# -----------------------------
@app.post("/embed")
def create_embedding(req: EmbeddingRequest):
    if req.type == "text":
        if req.model == "clip":
            vector = embed_text_openclip(req.content)
        else:
            vector = embed_text_transformers(req.content)
    elif req.type == "image":
        vector = embed_image(req.content)
    else:
        raise HTTPException(status_code=400, detail="Invalid type. Use 'text' or 'image'.")
    return {"embedding": vector}
