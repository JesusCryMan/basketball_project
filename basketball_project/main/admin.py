from django.contrib import admin
from .models import Player

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'team', 'position')  # убрали is_hall_of_fame
    list_filter = ('team',)  # убрали is_hall_of_fame
    search_fields = ('name', 'team', 'position')