from django.db import models
from django.utils.text import slugify
from django.urls import reverse

class Player(models.Model):
    CATEGORY_CHOICES = [
    ('rost', 'Стартовый состав'),
    ('bench', 'Запасные'),
    ('senior', 'Старшие игроки'),
    ('hall', 'Hall of Fame'),
]

    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)

    age = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)

    team = models.CharField(max_length=100, blank=True, null=True)
    position = models.CharField(max_length=50, blank=True, null=True)

    # Фото через админку
    photo = models.ImageField(upload_to='players/', blank=True, null=True)

    # Имя файла фото в static/images/players
    photo_filename = models.CharField(
        max_length=100,
        default='default_player.jpg',
        help_text="Имя файла фото в static/images/players/"
    )

    hand = models.CharField(max_length=20, blank=True, null=True)
    specialty = models.CharField(max_length=100, blank=True, null=True)
    generation = models.CharField(max_length=50, blank=True, null=True)
    number = models.IntegerField(blank=True, null=True)
    other_info = models.TextField(blank=True, null=True)

    # Для вкладок и достижений
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, default='rost')
    achievements = models.CharField(max_length=200, blank=True, null=True)

    def save(self, *args, **kwargs):
        # Автоматический slug из имени игрока
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def get_image_url(self):
        """
        Возвращает путь к фото:
        - если есть ImageField photo, используем его
        - иначе берём photo_filename из static/images/players
        """
        if self.photo:
            return self.photo.url
        return f'images/players/{self.photo_filename}'

    def get_absolute_url(self):
        """
        Ссылка на профиль игрока
        """
        return reverse('player_profile', args=[self.slug])

    def __str__(self):
        return self.name