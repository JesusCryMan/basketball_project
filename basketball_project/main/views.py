from django.shortcuts import render, get_object_or_404
from .models import Player  # убедись, что у тебя есть модель Player

# Главная страница
def home(request):
    return render(request, 'home.html')

# Страница атаки
def attack(request):
    return render(request, 'attack.html')

# Страница защиты
def defense(request):
    return render(request, 'defense.html')

# Новости
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

# Страница со списком игроков
def players(request):
    all_players = Player.objects.all()
    return render(request, 'players.html', {'players': all_players})

# Профиль конкретного игрока
def player_profile(request, player_id):
    player = get_object_or_404(Player, id=player_id)
    return render(request, 'player_profile.html', {'player': player})
    