
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from .managers import CustomUserManager
from .validators import username_validator
from django.utils.translation import gettext_lazy as _
import datetime
from django.contrib.auth.models import PermissionsMixin

# Create your models here.


class CustomUser(AbstractBaseUser, PermissionsMixin):

    # class Meta:
    #     app_label = 'accounts'

    username = models.CharField(_('username'), max_length=40, blank=False, null=False,
                                unique=True)
    email = models.EmailField(
        _('email address'), unique=True, blank=False, null=False)
    first_name = models.CharField(
        _('first name'), blank=False, null=False, max_length=100)
    last_name = models.CharField(
        _('last name'), blank=False, null=False, max_length=100)
    date_of_birth = models.DateField(
        _('date of birth'), default=datetime.date.today)
    company_name = models.CharField(
        _('company name'), max_length=100, blank=True, null=True)
    is_superuser = models.BooleanField(
        _('superuser'), blank=False, null=False, default=False)
    is_staff = models.BooleanField(
        _('staff'), blank=False, null=False, default=False)
    is_active = models.BooleanField(
        _('active'), blank=False, null=False, default=False)
    date_joined = models.DateField(default=datetime.date.today)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username',
                       'first_name', 'last_name', 'date_of_birth']

    objects = CustomUserManager()

    def __str__(self):
        return self.username

    def get_short_name(self):
        return self.first_name

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def deactivate(self):
        self.is_active = False
        return

    def activate(self):
        if self.is_active == False:
            self.is_active = True
            return
        else:
            return
