from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('movie/<int:movie_pk>/', views.review_movie),
    path('user/<int:user_pk>/', views.review_user),

]