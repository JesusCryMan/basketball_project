from django.db import models
class Player(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField(blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)
    team = models.CharField(max_length=100, blank=True, null=True)
    position = models.CharField(max_length=50, blank=True, null=True)
    photo = models.ImageField(upload_to='players/', blank=True, null=True)
    hand = models.CharField(max_length=20, blank=True, null=True)  # ведущая рука
    specialty = models.CharField(max_length=100, blank=True, null=True)  # сильный приём
    generation = models.CharField(max_length=50, blank=True, null=True)  # новое/старое поколение
    other_info = models.TextField(blank=True, null=True)  # другое

    def __str__(self):
        return self.name