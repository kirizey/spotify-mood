from django.contrib.auth.models import User
from api.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from api.spotify import spoty_api


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GetAlbumMood(viewsets.ViewSet):
    def retrieve(self, request, pk):
        print('asd')
        snippet = self.get_object(pk)
        album = spoty_api.album(pk)
        print(album)

        return Response(album)
