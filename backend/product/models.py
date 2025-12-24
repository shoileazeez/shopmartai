from uuid import uuid4

from django.conf import settings
from django.db import models
from pgvector.django import VectorField  # pgvector
from pgvector.django import HnswIndex

User = settings.AUTH_USER_MODEL


# -----------------------------
# Category
# -----------------------------
class Category(models.Model):
    CATEGORY_CHOICES = [
        ("electronics", "Electronics"),
        ("fashion", "Fashion"),
        ("home_appliances", "Home Appliances"),
        ("books", "Books"),
        ("toys", "Toys"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        unique=True,
    )
    description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.get_name_display()


# -----------------------------
# Product
# -----------------------------
class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    name = models.CharField(max_length=255)
    description = models.TextField()

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
    )

    price = models.DecimalField(max_digits=10, decimal_places=2)

    # Text embedding (for semantic search)
    embedding = VectorField(
        dimensions=1024,
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["name"]),
            HnswIndex(
                name="product_embedding_hnsw",
                fields=["embedding"],
                opclasses=["vector_cosine_ops"],
                m=16,
                ef_construction=64,
            ),
        ]

    def __str__(self):
        return self.name


# -----------------------------
# Product Image (with embedding)
# -----------------------------
class ProductImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="images",
    )

    image_url = models.URLField()
    alt_text = models.CharField(max_length=255, blank=True)

    # Image embedding (CLIP / multimodal search)
    embedding = VectorField(
        dimensions=768,
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]
        indexes = [
            HnswIndex(
                name="productimage_embedding_hnsw",
                fields=["embedding"],
                opclasses=["vector_cosine_ops"],
                m=16,
                ef_construction=64,
            ),
        ]

    def __str__(self):
        return f"Image for {self.product.name}"


# -----------------------------
# Review
# -----------------------------
class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="reviews",
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reviews",
    )

    rating = models.PositiveSmallIntegerField(
        choices=[(i, i) for i in range(1, 6)]
    )
    comment = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("product", "user")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.rating}★ review for {self.product.name}"


# -----------------------------
# Inventory (single source of truth)
# -----------------------------
class Inventory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)

    product = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        related_name="inventory",
    )

    quantity = models.PositiveIntegerField(default=0)
    last_restocked = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Inventory for {self.product.name}: {self.quantity}"
