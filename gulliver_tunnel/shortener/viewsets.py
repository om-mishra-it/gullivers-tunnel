from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import ShortenedURL
from .serializers import ShortenedURLSerializer
from .utilities import generate_short_code


class ShortenedURLViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=["GET", "POST", "PUT", "DELETE"])
    def manage_urls(self, request):
        """Handle all URL shortener actions based on request method."""

        # List all URLs of the user
        if request.method == "GET":
            urls = ShortenedURL.objects.filter(user=request.user)
            serializer = ShortenedURLSerializer(urls, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Create a new shortened URL
        elif request.method == "POST":
            serializer = ShortenedURLSerializer(data=request.data)
            if serializer.is_valid():
                short_code = generate_short_code()
                serializer.save(user=request.user, short_code=short_code)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Update an existing shortened URL
        elif request.method == "PUT":
            short_code = request.data.get("short_code")
            url_entry = get_object_or_404(ShortenedURL, short_code=short_code, user=request.user)
            serializer = ShortenedURLSerializer(url_entry, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Remove a shortened URL
        elif request.method == "DELETE":
            short_code = request.data.get("short_code")
            url_entry = get_object_or_404(ShortenedURL, short_code=short_code, user=request.user)
            url_entry.delete()
            return Response({"message": "Shortened URL deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

        # Unsupported Method
        return Response({"error": "Unsupported method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


