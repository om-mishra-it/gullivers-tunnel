from rest_framework import serializers
from .models import User, OTP


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'date_of_birth', 'is_verified']


# OTP Request Serializer
class OTPRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


# OTP Verification Serializer
class OTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp_code = serializers.CharField(max_length=6)
