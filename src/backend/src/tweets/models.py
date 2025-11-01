from django.db import models
from accounts.models import CustomUser
from django.utils import timezone
from django.db.models.signals import post_save
from django.conf import settings
from django.contrib.auth import get_user_model


UserModel = get_user_model()
# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(
        'accounts.CustomUser', related_name="profile", on_delete=models.CASCADE, blank=False, null=False)
    status = models.CharField(max_length=500, blank=True, null=True)
    following = models.ManyToManyField(
        'self', symmetrical=False, related_name='followers', blank=True, null=True)

    def __str__(self):
        return self.user.username

    def get_following_count(self):
        return self.following.all().count()

    def get_followers_count(self):
        return self.followers.all().count()

    def if_following(self, obj, **kwargs):
        if self.followers.filter(user=obj).exists():
            return True
        else:
            return False


def post_save_user_receiver(sender, instance, created, *args, **kwargs):
    if instance:
        if created:
            new_profile = UserProfile.objects.get_or_create(user=instance)
            return
        else:
            return
    else:
        return


post_save.connect(post_save_user_receiver, sender=CustomUser)


# class TweetManager(models.Manager):
"""def retweet(self, user, parent_obj):
        while parent_obj.parent:
            parent_obj = parent_obj.parent

        obj = self.model(
            parent=parent_obj,
            owner=user,
            content=parent_obj.content,
            type="Retweet"
        )
        obj.save()
        return obj

    def reply(self, user, parent_obj, content):
        obj = self.model(
            parent=parent_obj,
            owner=user,
            content=content,
            type="Reply"
        )
        obj.save()
        return obj"""

"""def toggle_like(self, user, tweet_obj):
        liked = None
        if tweet_obj and user:
            if user in tweet_obj.likes.all():
                liked = True
                tweet_obj.likes.remove(user)
            else:
                liked = False
                tweet_obj.likes.add(user)
                return liked
        else:
            return liked

    def toggle_flag(self, user, tweet_obj):
        if user in tweet_obj.flags.all():
            flagged = True
            tweet_obj.flags.remove(user)
        else:
            flagged = False
            tweet_obj.flags.add(user)
        return flagged"""


class Tweet(models.Model):
    parent = models.ForeignKey(
        'self', related_name='retweetsnreplies', on_delete=models.CASCADE, blank=True, null=True)
    owner = models.ForeignKey(
        UserModel, related_name='user_tweets', on_delete=models.CASCADE)
    content = models.CharField(max_length=140, blank=False, null=False)
    TWEET_TYPES = (('Original', 'Original'),
                   ('Retweet', 'Retweet'), ('Reply', 'Reply'))
    type = models.CharField(max_length=10, choices=TWEET_TYPES)
    created_date = models.DateTimeField(default=timezone.now())
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name='liked_tweets')
    flags = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, related_name='flagged_tweets')

    def __str__(self):
        return self.content

    def what_tweet(self):
        return self.content

    def create(self, *args, **kwargs):
        super(Tweet, self).create(*args, **kwargs)

    def is_tweet_owner(self, user):
        if user:
            if self.owner == user:
                return True
            else:
                return False
        else:
            return False

    def is_liked(self, user):
        liked = None

        if user:
            if user in self.likes.all():
                liked = True
            else:
                liked = False
            return liked
        else:
            return liked

    def likes_count(self):
        if self.likes:
            return self.likes.count()
        else:
            return None
