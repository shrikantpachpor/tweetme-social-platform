from django.core.validators import RegexValidator


def username_validator(string):
    invalid_usernames = RegexValidator(regex=("admin", "superuser", "moderator", "editor", "staff", "staff_user",
                                              "staffuser", "supporter", "poweruser", "power_user", "support", "tech_support", "techsupport", "administrator"))
    if value in invalid_usernames:
        raise ValidationError("This is username is already taken")
