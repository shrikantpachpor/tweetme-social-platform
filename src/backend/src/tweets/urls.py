from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter, SimpleRouter
from django.contrib import admin
from tweets import views
app_name = "tweets"

router = DefaultRouter()
#router.register(r'tweets', views.TweetViewSet, basename="tweets"),
#router.register(r'users', views.TweetUserDetailsView, basename="users"),


urlpatterns = [
    url('', include(router.urls)),
]
