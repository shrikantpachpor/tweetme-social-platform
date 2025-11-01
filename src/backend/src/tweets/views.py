from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.db import models
from django.db.models import Q
from tweets.models import UserProfile, Tweet
# Create your views here.
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS, IsAuthenticatedOrReadOnly, AllowAny
from django.core import serializers
from rest_framework.response import Response
from tweets.serializers import CustomUserSerializer, UserProfileSerializer, TweetSerializer, UserTweetsSerializer
from django.utils import timezone
from tweets.models import Tweet
from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import requires_csrf_token
from tweets.utilities import enforce_csrf,pretty_request







UserModel = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    #permission_classes = (AllowAny,)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    # permission_classes = (AllowAny,)

    def get_serializer_context(self):
        context = super(UserProfileViewSet, self).get_serializer_context()
        context.update({"request": self.request})
        # context["request"] = self.request
        return context

    @action(methods=['get'], detail=True, permission_classes=[IsAuthenticated],
            url_path='toggle-follow', url_name='toggle_follow')
    def toggle_follow(self, request, pk=None):
        if pk:
            if request.user:
                profile = UserProfile.objects.get(id=pk)
                if profile:
                    is_user_following = profile.followers.filter(
                        user=request.user).exists()
                    user_profile = UserProfile.objects.get(
                        user=request.user)
                    if is_user_following:
                        profile.followers.remove(user_profile)
                    else:
                        profile.followers.add(user_profile)
                    profile = UserProfileSerializer(
                        profile, context={'request': self.request}).data

                    return Response(profile, status.HTTP_200_OK)
                else:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                return Response(status=status.HTTP_404_NOT_FOUND)
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_404_NOT_FOUND)

    @action(methods=['get'], detail=True, permission_classes=[IsAuthenticated],
            url_path='check-if-following', url_name='check_if_following')
    def check_if_following(self, request, pk=None):
        if pk:
            if request.user:
                profile = UserProfile.objects.get(id=pk)
                if profile:
                    is_user_following = profile.followers.filter(
                        user=request.user).exists()
                    return Response(is_user_following, status=status.HTTP_200_OK)
                return Response(status=status.HTTP_404_NOT_FOUND)
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_404_NOT_FOUND)

    @action(methods=['get'], detail=True, permission_classes=[IsAuthenticated],
            url_path='get-connections', url_name='get_connections')
    def get_connections(self, request, pk=None):
        if pk:
            connections = {}
            profile = UserProfile.objects.get(id=pk)
            following = profile.following.all()
            following = UserProfileSerializer(following, many=True).data
            connections['following'] = following
            followers = profile.followers.all()
            followers = UserProfileSerializer(followers, many=True).data
            connections['followers='] = followers
            return Response(connections, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all().order_by('-created_date')
    serializer_class = TweetSerializer
    #permission_classes = (IsAuthenticatedOrReadOnly,)
    permission_classes = (AllowAny,)

    def get_serializer_context(self):
        context = super(TweetViewSet, self).get_serializer_context()
        context.update({"request": self.request})
        # context["request"] = self.request
        return context
    
    #@method_decorator(requires_csrf_token)
    #@requires_csrf_token
    #@method_decorator(csrf_protect)
    def get_queryset(self,pk=None):
        try:
            self.get_serializer_context()
        except:
            pass

        # Comment out CSRF enforcement for development
        # enforce_csrf(self.request)
   
        if not self.request.user.is_anonymous:
            try:
                # Get tweets from users you're following PLUS your own tweets
                following_users = self.request.user.profile.following.values_list('user', flat=True)
                
                # Include tweets from followed users AND your own tweets
                all_relevant_tweets = Tweet.objects.filter(
                    Q(owner__in=following_users) | Q(owner=self.request.user)
                ).order_by('-created_date')
                
                return all_relevant_tweets
            except:
                # Fallback to all tweets if there's an issue
                return Tweet.objects.all().order_by('-created_date')
        else:
            # Return all tweets for anonymous users
            return Tweet.objects.all().order_by('-created_date')

    def create(self, request, pk=None):
        """
        Create a new tweet
        """
        
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
        
        parent = None
        owner = request.user
        content = request.data.get('tweet', '')
        
        if not content.strip():
            return Response({"detail": "Tweet content cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
            
        created_date = timezone.now()
        tweet = {
            "parent": parent,
            "owner": owner,
            "content": content,
            "type": "Original",
            "created_date": created_date
        }
        
        try:
            created_tweet = Tweet.objects.create(**tweet)
            
            # Return the created tweet data
            serializer = TweetSerializer(created_tweet, context={'request': request})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": "Error creating tweet"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=['get'], detail=True, permission_classes=[IsAuthenticated],
            url_path='like', url_name='like')
    def toggle_like(self, request, pk=None):
        if pk:
            if request.user:
                if Tweet.objects.filter(id=pk).exists():
                    tweet = Tweet.objects.get(id=pk)
                    if tweet.parent and tweet.type == "Retweet":
                        while tweet.parent:
                            tweet = tweet.parent
                    if request.user in tweet.likes.all():
                        tweet.likes.remove(request.user)
                    else:
                        tweet.likes.add(request.user)
                    tweet = TweetSerializer(
                        tweet, context={'request': self.request}).data
                    return Response(tweet, status=status.HTTP_200_OK)
                else:
                    return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(methods=['get'], detail=True, permission_classes=[IsAuthenticated],
            url_path='delete-tweet', url_name='delete_tweet')
    def delete_tweet(self, request, pk=None):
        if pk:
            if request.user:
                if Tweet.objects.filter(id=pk).exists():
                    tweet = Tweet.objects.get(id=pk)
                    if request.user == tweet.owner:
                        tweet.delete()
                        return Response(status=status.HTTP_200_OK)
                    else:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(methods=['post'], detail=False, permission_classes=[IsAuthenticated],
            url_path='retweet', url_name='retweet')
    def retweet(self, request):
        if request.user:
            if request.data['type'] == "Retweet":
                parent = request.data['parent']
                if parent:
                    if Tweet.objects.filter(id=parent).exists():
                        parent_tweet = Tweet.objects.get(id=parent)
                        while parent_tweet.parent:
                            parent_tweet = parent_tweet.parent
                    else:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                else:
                    return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
            parent = parent_tweet
            owner = request.user
            content = parent_tweet.content
            if 'created_date' in request.data:
                created_date = request.data['created_date']
            else:
                created_date = timezone.now()
            tweet = {
                "parent": parent,
                "owner": owner,
                "content": content,
                "type": "Retweet",
                "created_date": created_date
            }
            try:
                retweeted_tweet = Tweet.objects.create(**tweet)
                return Response(status=status.HTTP_201_CREATED)
                # else:
                # return Response(status=status.HTTP_404_NOT_FOUND)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(methods=['post'], detail=True, permission_classes=[IsAuthenticated],
            url_path='reply', url_name='reply')
    def reply(self, request, pk=None):
        if pk:
            if request.user:
                if Tweet.objects.filter(id=pk).exists():
                    parent = Tweet.objects.get(id=pk)
                else:
                    return Response(status=status.HTTP_404_NOT_FOUND)
                reply_content = request.data['tweet']
                owner = request.user
                created_date = timezone.now()
                tweet = {
                    "parent": parent,
                    "owner": owner,
                    "content": reply_content,
                    "type": "Reply",
                    "created_date": created_date
                }
                try:
                    tweet_reply = Tweet.objects.create(**tweet)
                    return Response(status=status.HTTP_201_CREATED)
                except:
                    return Response(status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UserTweetsViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserTweetsSerializer

    def get_serializer_context(self):
        context = super(UserTweetsViewSet, self).get_serializer_context()
        context.update({'request': self.request})
        # context["request"] = self.request
        return context


