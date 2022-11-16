from django.shortcuts import render
from django.contrib.auth import get_user_model
# drf
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from rest_framework import status

# 숏컷
from django.shortcuts import get_object_or_404, get_list_or_404

# 모델/시리얼라이저
from .serializers import *
from .models import *
from movies.models import *
from movies.serializers import *

@api_view(['GET'])
def user_profile(request, user_pk):
    user = get_object_or_404(get_user_model(), pk=user_pk)
    serializer = ProfileSerializer(user, fields=['id', 'username', 'watched_movies', 'to_watch_movies', 'best_movies'])
    return Response(serializer.data)


@api_view(['POST'])
def add_to_watch(request, user_pk, movie_pk):
    user = get_object_or_404(get_user_model(), pk=user_pk)
    movie = get_object_or_404(Movie, pk=movie_pk)
    # 프론트에서 새로 추가한 영화를 프로필 데이터에 추가하고 프로필 데이터를 보내줌
    serializer = ProfileSerializer(user, data=request.data)
    if serializer.is_valed(raise_exception=True):
        serializer.save

    pass


@api_view(['POST'])
def add_watched(request, user_pk, movie_pk):
    pass


@api_view(['POST'])
def add_best(request, user_pk, movie_pk):
    pass