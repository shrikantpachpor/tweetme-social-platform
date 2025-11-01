"""tweetme URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from allauth.account.views import confirm_email
import tweetme.views as views
from .views import GoogleLogin, CustomLoginView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('csrf/', views.csrf),
    path('ping/', views.ping),
    re_path(r'^api/', include('tweetme.api')),
    re_path(r'^custom-login/', CustomLoginView.as_view(), name="custom-login"),
    re_path(r'^rest-auth/', include('dj_rest_auth.urls')),
    re_path(r'^rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    #path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    re_path(r'^accounts/', include('allauth.urls')),
    re_path(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$',
        confirm_email, name='account_confirm_email'),

]
