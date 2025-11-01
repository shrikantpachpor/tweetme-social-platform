from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager
#from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    use_in_migrations = True

    """
    """

    def create_user(self, email, password, **kwargs):
        """
        Create and save a user with the given email and password
        """
        if not email:
            raise ValueError(_('The email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    """
    
    """

    def create_superuser(self, email, password, **kwargs):
        """
        Create and save a SuperUser with the given email and password
        """
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('is_active', True)

        if not email:
            raise ValueError(_('The email must be set'))
        if kwargs.get('is_staff') is not True:
            raise ValueError(_('Superuser must have staff status active'))
        if kwargs.get('is_superuser') is not True:
            raise ValueError(_('Super must have superuser status active'))
        return self.create_user(email, password, **kwargs)

    """
    
    """

    def create_staffuser(self, email, password, **kwargs):
        """
        Create and save a staffuser with the given email and password
        staff status will true but is_superuser will be false
        """
        if not email:
            raise ValueError(_('The email must be set'))
        if kwargs.get('is_staff') is not True:
            raise ValueError(_('Staffuser must have staff status active'))
        if kwargs.get('is_superuser') is True:
            raise ValueError(_('Staffuser cannot be superuser'))
        return self.create_user(email, password, **kwargs)
