from django.contrib import admin
from tweets.models import (UserProfile, Tweet)
# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Tweet)
# admin.site.register(TweetReply)
# admin.site.register(Retweet)
# admin.site.register(Like)
