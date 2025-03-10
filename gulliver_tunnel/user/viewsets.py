import random

from django.contrib.auth import login
from django.utils.timezone import now
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from user.models import User
from user.serializers import UserSerializer


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

        otp = str(random.randint(100000, 999999))
        user.otp = otp
        user.otp_created_at = now()
        user.save()

        # TODO: Integrate actual email/SMS sending service here
        print(f"OTP for {email}: {otp}")

        return Response({"message": "OTP sent successfully"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=["POST"])
    def verify_otp(self, request):
        """Verifies the OTP and authenticates the user"""
        email = request.data.get("email")
        otp = request.data.get("otp")

        if not email or not otp:
            return Response({"error": "Email and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check OTP expiry (valid for 5 minutes)
        if user.otp != otp:
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        if user.otp_created_at and (now() - user.otp_created_at).seconds > 300:
            return Response({"error": "OTP expired"}, status=status.HTTP_400_BAD_REQUEST)

        # OTP verification success
        user.is_verified = True
        user.otp = None
        user.otp_created_at = None
        user.save()

        login(request, user)

        return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)
