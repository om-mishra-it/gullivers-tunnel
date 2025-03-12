import secrets
from user.models import User
from django.db import models


class APIKey(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="api_key")
    key = models.CharField(max_length=40, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = secrets.token_hex(20)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"API Key for {self.user.email}"
