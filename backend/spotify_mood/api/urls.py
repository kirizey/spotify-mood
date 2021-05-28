from django.contrib import admin
from django.urls import include, path
from django.contrib.auth.models import User
from rest_framework import routers
from api.views import UserViewSet


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
