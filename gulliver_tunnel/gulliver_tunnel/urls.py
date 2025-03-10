from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from user.viewsets import UserViewSet
from shortener.viewsets import ShortenedURLViewSet

router = DefaultRouter()
router.register(r'userviewset', UserViewSet, basename='userviewset')
router.register(r'shortenedurlviewset', ShortenedURLViewSet, basename='shortenedurlviewset')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
]
