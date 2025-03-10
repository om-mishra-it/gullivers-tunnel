import random

from django.contrib.auth import login
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import User, OTP
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "email"

    @action(detail=False, methods=["POST"])
    def request_otp(self, request):
        """Generates and sends an OTP to the user"""
        email = request.data.get("email")
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

        user, created = User.objects.get_or_create(email=email)

        # Generate OTP
        otp_code = str(random.randint(100000, 999999))

        # Store OTP in the OTP model
        OTP.objects.create(user=user, otp_code=otp_code)

        # TODO: Integrate actual email/SMS sending service here
        print(f"OTP for {email}: {otp_code}")

        return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=["POST"])
    def verify_otp(self, request):
        """Verifies the OTP and authenticates the user"""
        email = request.data.get("email")
        otp = request.data.get("otp")

        if not email or not otp:
            return Response({"error": "Email and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, email=email)

        # Retrieve latest OTP entry for the user
        otp_entry = OTP.objects.filter(user=user).order_by("-created_at").first()

        if not otp_entry:
            return Response({"error": "No OTP found"}, status=status.HTTP_400_BAD_REQUEST)

        # Check OTP validity
        if otp_entry.otp_code != otp:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        if not otp_entry.is_valid():
            return Response({"error": "OTP expired"}, status=status.HTTP_400_BAD_REQUEST)

        # OTP verification success
        user.is_verified = True
        user.save()

        # Delete used OTP
        otp_entry.delete()

        return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)
