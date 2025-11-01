
from rest_framework.authentication import TokenAuthentication


class TokenAuthSupportCookie(TokenAuthentication):
    """
    Extend the TokenAuthentication class to support cookie based authentication
    """

    def authenticate(self, request):
        # Check if 'auth_token' is in the request cookies.
        # Give precedence to 'Authorization' header.
        auth_token = request.COOKIES.get('auth_token')
        if 'auth_token' in request.COOKIES and 'HTTP_AUTHORIZATION' not in request.META:
            return self.authenticate_credentials(
                auth_token
            )
        return super().authenticate(request)
