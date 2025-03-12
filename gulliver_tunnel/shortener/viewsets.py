from django.shortcuts import get_object_or_404, redirect
from django.utils.timezone import now
from rest_framework import views, viewsets, status
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response

from .models import ShortenedURL
from .serializers import ShortenedURLSerializer
from .utilities import generate_short_code

from api_access.authentication import APIKeyAuthentication


class ShortenedURLViewSet(viewsets.ModelViewSet):
    """API to manage shortened URLs"""
    authentication_classes = [TokenAuthentication, APIKeyAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = ShortenedURL.objects.all()
    serializer_class = ShortenedURLSerializer

    def get_queryset(self):
        """Only return URLs belonging to the authenticated user."""
        return ShortenedURL.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """Shorten a new URL."""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            short_code = generate_short_code()
            serializer.save(user=request.user, short_code=short_code)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """Update an existing shortened URL."""
        short_code = request.data.get("short_code")
        url_entry = get_object_or_404(ShortenedURL, short_code=short_code, user=request.user)
        serializer = self.get_serializer(url_entry, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        """Delete a shortened URL."""
        short_code = request.data.get("short_code")
        url_entry = get_object_or_404(ShortenedURL, short_code=short_code, user=request.user)
        url_entry.delete()
        return Response({"message": "Shortened URL deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class RedirectView(views.APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "redirect"

    def get(self, request, short_code):
        url_entry = get_object_or_404(ShortenedURL, short_code=short_code)

        # Check if the link is expired
        if url_entry.expires_at and url_entry.expires_at < now():
            return Response({"error": "This shortened URL has expired."}, status=status.HTTP_410_GONE)

        return redirect(url_entry.original_url)
