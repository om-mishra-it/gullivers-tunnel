from rest_framework import serializers
from .models import APIKey


class APIKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = APIKey
        fields = ["key", "created_at"]
