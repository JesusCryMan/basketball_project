from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('attack/', views.attack, name='attack'),
    path('defense/', views.defense, name='defense'),
    path('news/', views.news, name='news'),
    path('players/', views.players, name='players'),
    path('player/<int:player_id>/', views.player_profile, name='player_profile'),
]