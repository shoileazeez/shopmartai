from django.urls import path
from .views import CurrentUserView, GoogleLogin, ProfileCreateView

urlpatterns = [
    path("user/", CurrentUserView.as_view(), name="current-user"),
    path("google-login/", GoogleLogin.as_view(), name="google-login"),
    path("profile/create/", ProfileCreateView.as_view(), name="profile-create"),
]
