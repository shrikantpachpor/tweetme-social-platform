from django.urls import path, include
from rest_framework.routers import DefaultRouter, SimpleRouter
from django.contrib import admin
from tweets.views import UserViewSet, TweetViewSet, UserProfileViewSet, UserTweetsViewSet
app_name = "api"

router = DefaultRouter()
router.register(r'tweets', TweetViewSet, basename='tweets'),
router.register(r'user-tweets', UserTweetsViewSet, basename='user-tweets'),
router.register(r'profiles', UserProfileViewSet, basename='profiles'),
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
]
