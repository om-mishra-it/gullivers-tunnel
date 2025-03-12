from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import APIKey


class APIKeyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        api_key = request.headers.get("Api-Key")
        if not api_key:
            return None

        try:
            api_key_obj = APIKey.objects.get(key=api_key)
            return api_key_obj.user, None
        except APIKey.DoesNotExist:
            raise AuthenticationFailed("Invalid API Key")