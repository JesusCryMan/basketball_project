from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('attack/', views.attack_view, name='attack'),
    path('defense/', views.defense, name='defense'),
    path('news/', views.news, name='news'),
    path('players/', views.players, name='players'),
    path('player/<slug:slug>/', views.player_profile, name='player_profile'),
    path('tacboard/', views.tacboard, name='tacboard'),  # теперь должно работать
]