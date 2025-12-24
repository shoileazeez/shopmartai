from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "is_social_login", "created_at"]
    read_only_fields = ["id", "created_at", "updated_at"]


