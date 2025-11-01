from rest_framework import serializers
from django.core import serializers as CoreSerializers
from django.contrib.auth import get_user_model

from django.db.models import Q

from tweets.models import UserProfile, Tweet

UserModel = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'username', 'first_name', 'last_name']
        exclude_field = ('password', 'last_login', 'email', 'date_of_birth', 'company_name',
                         'is_superuser', 'is_staff', 'date_joined', 'groups', 'user_permissions')


class UserTweetsSerializer(serializers.ModelSerializer):
    tweets = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'first_name', 'last_name', 'tweets')

    def get_tweets(self, instance):
        if instance:
            tweets = []
            tweets = instance.user_tweets.order_by('-created_date')
            if tweets:
                tweets = TweetSerializer(tweets, many=True, context={
                                         "request": self.context['request']}).data
                return tweets
            return None
        return None


class UserProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    following_count = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'status',
                  'following_count', 'followers_count', 'is_following')

        depth = 8

    def get_following_count(self, instance):
        if instance:
            count = instance.get_following_count()
            return count
        else:
            return None

    def get_followers_count(self, instance):
        if instance:
            count = instance.get_followers_count()
            return count
        else:
            return None

    def get_is_following(self, instance):
        if instance:
            if self.context['request'].user:
                return instance.if_following(
                    self.context['request'].user)


class ParentTweetSerializer(serializers.ModelSerializer):
    owner = CustomUserSerializer()
    likes_count = serializers.SerializerMethodField()
    if_liked = serializers.SerializerMethodField()
    if_tweet_owner = serializers.SerializerMethodField()
    retweet_count = serializers.SerializerMethodField()
    reply_count = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = ('id',
                  'parent',
                  'owner',
                  'content',
                  'type',
                  'created_date',
                  'likes_count',
                  'reply_count',
                  'retweet_count',
                  'if_liked',
                  'if_tweet_owner')
        depth = 8

    def get_likes_count(self, instance):
        if instance:
            return instance.likes_count()
        else:
            return None

    def get_if_liked(self, instance):
        if instance:
            if self.context['request']:
                user = self.context['request'].user
            else:
                return None
            if user:
                return instance.is_liked(user)
            else:
                return None
        else:
            return None

    def get_if_tweet_owner(self, instance):
        if instance:
            if self.context['request'].user:
                return instance.is_tweet_owner(self.context['request'].user)
            else:
                return None
        else:
            return None

    def get_retweet_count(self, instance):
        if instance:
            return instance.retweetsnreplies.filter(type='Retweet').count()
        else:
            return None

    def get_reply_count(self, instance):
        if instance:
            return instance.retweetsnreplies.filter(type='Reply').count()
        else:
            return None


class TweetSerializer(serializers.ModelSerializer):
    parent = ParentTweetSerializer()
    owner = CustomUserSerializer()
    likes_count = serializers.SerializerMethodField()
    if_liked = serializers.SerializerMethodField()
    if_tweet_owner = serializers.SerializerMethodField()
    retweet_count = serializers.SerializerMethodField()
    reply_count = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = ('id',
                  'parent',
                  'owner',
                  'content',
                  'type',
                  'created_date',
                  'likes_count',
                  'reply_count',
                  'retweet_count',
                  'if_liked',
                  'if_tweet_owner')
        depth = 8

    def get_likes_count(self, instance):
        if instance:
            return instance.likes_count()
        else:
            return None

    def get_if_liked(self, instance):
        if instance:
            if self.context['request']:
                user = self.context['request'].user
            else:
                return None
            if user:
                return instance.is_liked(user)
            else:
                return None
        else:
            return None

    def get_if_tweet_owner(self, instance):
        if instance:
            if self.context['request'].user:
                return instance.is_tweet_owner(self.context['request'].user)
            else:
                return None
        else:
            return None

    def get_retweet_count(self, instance):
        if instance:
            return instance.retweetsnreplies.filter(type='Retweet').count()
        else:
            return None

    def get_reply_count(self, instance):
        if instance:
            return instance.retweetsnreplies.filter(type='Reply').count()
        else:
            return None
