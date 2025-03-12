from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from user.viewsets import UserViewSet, LoginViewSet, LogoutViewSet
from shortener.viewsets import ShortenedURLViewSet, RedirectView
from api_access.viewsets import APIKeyViewSet

router = DefaultRouter()
router.register(r'userviewset', UserViewSet, basename='userviewset')
router.register(r'loginviewset', LoginViewSet, basename='loginviewset')
router.register(r'logoutviewset', LogoutViewSet, basename='logoutviewset')
router.register(r'shortenedurlviewset', ShortenedURLViewSet, basename='shortenedurlviewset')
router.register(r'api-access', APIKeyViewSet, basename="api-access")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("<str:short_code>/", RedirectView.as_view(), name="redirect"),
    path('api/v1/', include(router.urls)),
]
