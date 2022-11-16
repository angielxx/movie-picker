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

@api_view(['GET'])
def user_profile(request, user_pk):
    user = get_object_or_404(get_user_model(), pk=user_pk)
    serializer = ProfileSerializer(user, fields=['id', 'username', 'watched_movies', 'to_watch_movies', 'best_movies'])
    return Response(serializer.data)


@api_view(['POST'])
def add_to_watch(request, user_pk, movie_pk):
    pass


@api_view(['POST'])
def add_watched(request, user_pk, movie_pk):
    pass


@api_view(['POST'])
def add_best(request, user_pk, movie_pk):
    pass