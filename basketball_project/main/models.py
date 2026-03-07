from django.db import models
from django.utils.text import slugify

class Player(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)

    age = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)

    team = models.CharField(max_length=100, blank=True, null=True)
    position = models.CharField(max_length=50, blank=True, null=True)

    # Фото, если загружаешь через админку
    photo = models.ImageField(upload_to='players/', blank=True, null=True)

    # Новое поле для имени файла фото в static/images/players
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

    def save(self, *args, **kwargs):
        # Автоматический slug из имени игрока
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name