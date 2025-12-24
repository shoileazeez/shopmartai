from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination

from .models import Product, Review
from .serializers import ProductListSerializer, ProductDetailSerializer, ProductReviewSerializer

class ProductListView(generics.ListAPIView):
    queryset = (
        Product.objects
        .select_related("category")
        .prefetch_related("images")
        .select_related("inventory")
    )
    serializer_class = ProductListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["name", "description", "category__name"]
    ordering_fields = ["price", "name"]
    pagination_class = PageNumberPagination


class ProductDetailView(generics.RetrieveAPIView):
    queryset = (
        Product.objects
        .select_related("category", "inventory")
        .prefetch_related("images", "reviews")
    )
    serializer_class = ProductDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class AddReviewView(generics.CreateAPIView):


    serializer_class = ProductReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        product_id = self.kwargs.get("pk")
        serializer.save(user=self.request.user, product_id=product_id)