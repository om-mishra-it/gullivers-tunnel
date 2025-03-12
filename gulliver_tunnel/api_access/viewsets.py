from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import APIKey


class APIKeyViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=["POST"])
    def generate_key(self, request):
        """Generate a new API key for the authenticated user."""
        user = request.user
        APIKey.objects.filter(user=user).delete()
        api_key = APIKey.objects.create(user=user)
        return Response({"api_key": api_key.key}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["GET"])
    def get_key(self, request):
        """Retrieve the API key for the authenticated user."""
        user = request.user
        api_key = APIKey.objects.filter(user=user).first()
        if not api_key:
            return Response({"error": "No API Key found"}, status=status.HTTP_404_NOT_FOUND)
        return Response({"api_key": api_key.key}, status=status.HTTP_200_OK)

    @action(detail=False, methods=["DELETE"])
    def revoke_key(self, request):
        """Delete the user's API key."""
        user = request.user
        api_key = APIKey.objects.filter(user=user).first()
        if not api_key:
            return Response({"error": "No API Key found"}, status=status.HTTP_404_NOT_FOUND)
        api_key.delete()
        return Response({"message": "API Key revoked"}, status=status.HTTP_204_NO_CONTENT)
