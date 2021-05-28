from django.contrib import admin
from django.urls import include, path
from django.contrib.auth.models import User
from rest_framework import routers
from api.views import UserViewSet, GetAlbumMood


router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'album_mood', GetAlbumMood, basename='api')


urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include(router.urls)),
    path('api/api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # path('', GetAlbumMood.as_view(), name='mood'),
    # path('api/album/<str:pk>/', GetAlbumMood.as_view(), name='recover_username'),
]

urlpatterns += router.urls
