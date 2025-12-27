import requests

BASE = "https://shopmartai.onrender.com/embed"

# ---- Test text embedding ----
text_payload = {"type": "text", "content": "red sneakers for men"}
r1 = requests.post(BASE, json=text_payload)
print("Text embedding dimension:", r1.json()["dimension"])
print("Text vector sample:", r1.json()["embedding"][:5])

# ---- Test image embedding using Picsum ----
image_payload = {"type": "image", "content": "https://picsum.photos/512"}
r2 = requests.post(BASE, json=image_payload)
print("Image embedding dimension:", r2.json()["dimension"])
print("Image vector sample:", r2.json()["embedding"][:5])
