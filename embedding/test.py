# test_embedding_api.py
import requests
import json

BASE_URL = "http://127.0.0.1:8000"  # Change if running on different host/port

def test_text_embedding_clip():
    payload = {
        "type": "text",
        "content": "Wireless noise-cancelling headphones",
        "model": "clip"
    }
    response = requests.post(f"{BASE_URL}/embed", json=payload)
    assert response.status_code == 200, f"Failed: {response.text}"
    data = response.json()
    print("CLIP text embedding length:", len(data["embedding"]))
    print(data["embedding"][:5], "...")  # Print first 5 values for sanity check

def test_text_embedding_transformers():
    payload = {
        "type": "text",
        "content": "Smartphone with OLED display",
        "model": "default"
    }
    response = requests.post(f"{BASE_URL}/embed", json=payload)
    assert response.status_code == 200, f"Failed: {response.text}"
    data = response.json()
    print("SentenceTransformer text embedding length:", len(data["embedding"]))
    print(data["embedding"][:5], "...")

def test_image_embedding():
    payload = {
        "type": "image",
        "content": "https://picsum.photos/200/300"
    }
    response = requests.post(f"{BASE_URL}/embed", json=payload)
    assert response.status_code == 200, f"Failed: {response.text}"
    data = response.json()
    print("Image embedding length:", len(data["embedding"]))
    print(data["embedding"][:5], "...")

def run_all_tests():
    print("Testing CLIP text embedding...")
    test_text_embedding_clip()
    print("\nTesting SentenceTransformer text embedding...")
    test_text_embedding_transformers()
    print("\nTesting image embedding...")
    test_image_embedding()
    print("\nAll tests completed successfully!")

if __name__ == "__main__":
    run_all_tests()
