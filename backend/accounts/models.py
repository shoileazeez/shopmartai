from django.db import models
from django.contrib.auth import get_user_model

user = get_user_model()

class Profile(models.Model):
    user = models.OneToOneField(user, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    is_social_login = models.BooleanField(default=False)
    social_provider = models.CharField(max_length=50, null=True, blank=True)
    avatar = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email
