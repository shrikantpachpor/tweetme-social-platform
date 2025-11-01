from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.
from allauth import socialaccount
import allauth


# admin.site.register(allauth.socialaccount)


class UserAdmin(BaseUserAdmin):
    model = CustomUser

    list_display = ('username', 'email', 'first_name', 'last_name',
                    'date_of_birth',  'is_superuser', 'is_staff', 'is_active')
    list_filter = ('is_superuser',)

    fieldsets = (
        (None, {'fields': ('username', 'email', 'password',
                           'first_name', 'last_name', 'date_of_birth')}),

        ('Permissions', {'fields': ('is_staff', 'is_superuser')}),
    )

    search_fields = ('username', 'email', 'first_name',
                     'last_name', 'date_of_birth')
    ordering = ('username', 'email', 'first_name',
                'last_name', 'date_of_birth')

    filter_horizontal = ()


admin.site.register(CustomUser, UserAdmin)
