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
    # views.py
from django.shortcuts import render

def news(request):
    news_list = [
        {
            "title": "Победа в Чемпионате!",
            "date": "2026-03-01",
            "img": "images/news1.jpg",
            "desc": "Наша команда выиграла крупный турнир в городе!"
        },
        {
            "title": "Тренировка с легендой",
            "date": "2026-02-20",
            "img": "images/news2.jpg",
            "desc": "Игроки провели мастер-класс с профессионалом."
        },
        {
            "title": "Новые тактики атаки",
            "date": "2026-02-10",
            "img": "images/news3.jpg",
            "desc": "Тренер поделился новыми схемами игры."
        },
    ]
    return render(request, "news.html", {"news_list": news_list})