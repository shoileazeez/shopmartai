from django.conf import settings
from django.db import models
from uuid import uuid4
User = settings.AUTH_USER_MODEL


class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )
    phone = models.CharField(max_length=15)
    address = models.TextField()
    is_social_login = models.BooleanField(default=False)
    social_provider = models.CharField(max_length=50, null=True, blank=True)
    avatar = models.URLField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email
