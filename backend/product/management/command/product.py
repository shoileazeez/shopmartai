import random
from uuid import uuid4
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from product.models import ProductImage, Product, Inventory, Review, Category
from product.embedding import EmbeddingService  # Your embedding class


class Command(BaseCommand):
    help = "Generate sample products with images, inventory, reviews, and embeddings."

    CATEGORY_CHOICES = [
        "electronics",
        "fashion",
        "home_appliances",
        "books",
        "toys",
    ]

    def create_admin_user(self):
        User = get_user_model()
        if not User.objects.filter(is_superuser=True).exists():
            User.objects.create_superuser(
                username="admin",
                email="admin@shopsmart.ai",
                password="adminpassword",
            )
            self.stdout.write(self.style.SUCCESS("Created admin user"))

    def create_sample_users(self, count=50):
        """Ensure we have enough users for reviews"""
        User = get_user_model()
        users = []
        for i in range(count):
            username = f"user{i+1}"
            if not User.objects.filter(username=username).exists():
                user = User.objects.create_user(
                    username=username,
                    email=f"{username}@example.com",
                    password="password123"
                )
                users.append(user)
            else:
                users.append(User.objects.get(username=username))
        return users

    def handle(self, *args, **options):
        self.create_admin_user()
        users = self.create_sample_users(count=50)

        for i in range(100):
            category_name = random.choice(self.CATEGORY_CHOICES)
            category, _ = Category.objects.get_or_create(
                name=category_name,
                defaults={"description": f"Sample {category_name} products"}
            )

            product_name = f"{category_name.title()} Product {i+1}"
            product_description = f"This is a description for {product_name}."
            price = round(random.uniform(10, 1000), 2)

            # Create product
            product = Product.objects.create(
                name=product_name,
                description=product_description,
                category=category,
                price=price,
            )

            # Generate product text embedding
            embedding = EmbeddingService.embed_product_text(
                text=product_name + " " + product_description
            )
            product.embedding = embedding
            product.save(update_fields=["embedding"])

            # Create inventory
            Inventory.objects.create(
                product=product,
                quantity=random.randint(10, 200),
            )

            # Create 1-3 product images with embeddings
            num_images = random.randint(1, 3)
            for j in range(num_images):
                width = random.randint(200, 400)
                height = random.randint(200, 400)
                image_url = f"https://picsum.photos/{width}/{height}?random={uuid4()}"
                
                product_image = ProductImage.objects.create(
                    product=product,
                    image_url=image_url,
                    alt_text=f"{product.name} image {j+1}"
                )

                # Generate image embedding
                image_embedding = EmbeddingService.embed_product_image(image_url=image_url)
                product_image.embedding = image_embedding
                product_image.save(update_fields=["embedding"])

            # Create 10-20 reviews from random users
            num_reviews = random.randint(10, 20)
            review_users = random.sample(users, num_reviews)
            for user in review_users:
                Review.objects.create(
                    product=product,
                    user=user,
                    rating=random.randint(1, 5),
                    comment=f"Sample review by {user.username} for {product.name}"
                )

            self.stdout.write(self.style.SUCCESS(f"Created product with embeddings: {product.name}"))

        self.stdout.write(self.style.SUCCESS("Finished creating 100 products with embeddings!"))
