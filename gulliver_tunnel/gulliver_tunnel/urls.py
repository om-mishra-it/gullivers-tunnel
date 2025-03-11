from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from user.viewsets import UserViewSet
from shortener.viewsets import ShortenedURLViewSet, RedirectView

router = DefaultRouter()
router.register(r'userviewset', UserViewSet, basename='userviewset')
router.register(r'shortenedurlviewset', ShortenedURLViewSet, basename='shortenedurlviewset')

urlpatterns = [
    path('admin/', admin.site.urls),
    path("<str:short_code>/", RedirectView.as_view(), name="redirect"),
    path('api/v1/', include(router.urls)),
]
