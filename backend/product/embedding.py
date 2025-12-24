import requests
import os
from dotenv import load_dotenv
load_dotenv()
class EmbeddingService:
    EMBEDDING_API_URL = os.getenv("EMBEDDING_API_URL", "http://localhost:8000/embed")

    @staticmethod
    def embed_product_text(content: str):
        payload = {"type": "text", "content": content}
        resp = requests.post(EmbeddingService.EMBEDDING_API_URL, json=payload, timeout=10)
        resp.raise_for_status()
        return resp.json()["embedding"]

    @staticmethod
    def embed_user_query(query: str):
        payload = {"type": "text", "content": query}
        resp = requests.post(EmbeddingService.EMBEDDING_API_URL, json=payload, timeout=10)
        resp.raise_for_status()
        return resp.json()["embedding"]

    @staticmethod
    def embed_product_image(image_url: str):
        payload = {"type": "image", "content": image_url}
        resp = requests.post(EmbeddingService.EMBEDDING_API_URL, json=payload, timeout=10)
        resp.raise_for_status()
        return resp.json()["embedding"]

    # @staticmethod
    # def embed_custom_text(text: str, model_type: str = "default"):
    #     payload = {"type": "custom_text", "content": text, "model": model_type}
    #     resp = requests.post(EmbeddingService.EMBEDDING_API_URL, json=payload, timeout=10)
    #     resp.raise_for_status()
    #     return resp.json()["embedding"]
