from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def attack(request):
    return render(request, 'attack.html')

def defense(request):
    return render(request, 'defense.html')

def news(request):
    return render(request, 'news.html')

def players(request):
    return render(request, 'players.html')