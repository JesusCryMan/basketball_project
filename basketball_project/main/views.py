from django.shortcuts import render, get_object_or_404
from .models import Player
import feedparser  # для RSS

# Главная страница
def home(request):
    return render(request, 'home.html')

# Страница атаки
def attack_view(request):
    return render(request, 'attack.html')

# Страница защиты
def defense(request):
    return render(request, 'defense.html')

# Новости через RSS
from django.shortcuts import render
from .models import Player
import feedparser

import feedparser
from django.shortcuts import render

def news(request):
    rss_url = 'https://www.cbssports.com/rss/headlines/nba/'
    news_list = []

    try:
        feed = feedparser.parse(rss_url)
        if feed.bozo == 0 and len(feed.entries) > 0:
            for entry in feed.entries[:10]:  # последние 10 новостей
                news_list.append({
                    "title": entry.title,
                    "link": entry.link,
                    "desc": entry.get("description", ""),
                    "date": entry.get("published", "Без даты")
                })
        else:
            news_list.append({
                "title": "Новости временно недоступны",
                "link": "#",
                "desc": "Попробуйте обновить страницу через несколько минут.",
                "date": ""
            })
    except Exception as e:
        news_list.append({
            "title": "Ошибка подключения к RSS",
            "link": "#",
            "desc": str(e),
            "date": ""
        })

    return render(request, "news.html", {"news_list": news_list})
# Страница игроков с разделением на вкладки
def players(request):
    roster_players = Player.objects.filter(category='rost').order_by('number')
    bench_players = Player.objects.filter(category='bench').order_by('number')
    senior_players = Player.objects.filter(category='senior').order_by('number')
    hall_players = Player.objects.filter(category='hall').order_by('number')
    
    return render(request, 'players.html', {
        'roster_players': roster_players,
        'bench_players': bench_players,
        'senior_players': senior_players,
        'hall_players': hall_players,
    })

# Профиль игрока
def player_profile(request, slug):
    """
    Отображает профиль игрока по slug.
    """
    player = get_object_or_404(Player, slug=slug)
    
    context = {
        'player': player
    }

    return render(request, 'player_profile.html', context)

def tacboard(request):
    return render(request, 'main/tacboard.html')  # обязательно 'main/' перед названием
    