from rest_framework.response import Response
from rest_framework.decorators import api_view
# Authentication Decorators
# from rest_framework.decorators import authentication_classes

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404


from .serializers import ReviewSerializer
from .models import Review

# accounts
from django.contrib.auth import get_user_model
from accounts.serializers import *

# movies
from movies.models import Movie, BestMovie
from movies.serializers import *


@api_view(['GET'])
def review_movie(request, movie_pk):
    reviews = get_list_or_404(Review, movie_id=movie_pk)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def review_user(request, user_pk):
    reviews = get_list_or_404(Review, author_id=user_pk)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)