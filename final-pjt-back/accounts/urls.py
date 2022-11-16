from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('<int:user_pk>/', views.user_profile),
    path('<int:user_pk>/<int:movie_pk>/add_to_watch/', views.add_to_watch),
    path('<int:user_pk>/<int:movie_pk>/add_watched/', views.add_watched),
    path('<int:user_pk>/<int:movie_pk>/add_best/', views.add_best),
]
