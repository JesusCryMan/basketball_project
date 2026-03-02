from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),           # главная
    path('attack/', views.attack, name='attack'),
    path('defense/', views.defense, name='defense'),
    path('news/', views.news, name='news'),
    path('players/', views.players, name='players'),
]