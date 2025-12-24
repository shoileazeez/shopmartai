from rest_framework import generics, permissions
from .serializers import CurrentUserSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileCreateSerializer
from rest_framework import status
class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = CurrentUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ProfileCreateView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ProfileCreateSerializer(
            data=request.data,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"detail": "Profile created successfully"},
            status=status.HTTP_201_CREATED,
        )

from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

