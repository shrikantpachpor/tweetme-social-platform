# import custom adapter
from .adapters import GoogleOAuth2AdapterIdToken
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.http import JsonResponse
from django.middleware.csrf import get_token
from dj_rest_auth.views import LoginView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2AdapterIdToken
    client_class = OAuth2Client


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


def ping(request):
    return JsonResponse({'result': 'OK'})


class CustomLoginView(LoginView):
    def get_response(self):
        original_response = super().get_response().data
        response = Response("custom loginview coming through..")
        response.set_cookie(key='auth_token',
                            value=original_response['key'], httponly=True, samesite=None)
        response.set_cookie(key="uia", value=1, httponly=False,
                            expires="Session", samesite=None,)

        return response
