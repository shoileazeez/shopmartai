from rest_framework import serializers
from django.contrib.auth import get_user_model
from allauth.account.models import EmailAddress
from accounts.models import Profile

User = get_user_model()


class CurrentUserSerializer(serializers.ModelSerializer):
    email_verified = serializers.SerializerMethodField()
    has_profile = serializers.SerializerMethodField()
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "email_verified",
            "has_profile",
            "profile",
        ]

    def get_email_verified(self, obj):
        return EmailAddress.objects.filter(
            user=obj, verified=True
        ).exists()

    def get_has_profile(self, obj):
        return hasattr(obj, "profile")

    def get_profile(self, obj):
        if not hasattr(obj, "profile"):
            return None

        profile = obj.profile
        return {
            "phone": profile.phone,
            "address": profile.address,
            "is_social_login": profile.is_social_login,
            "social_provider": profile.social_provider,
            "avatar": profile.avatar,
        }


class ProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "phone",
            "address",
            "avatar",
        ]

    def validate(self, attrs):
        user = self.context["request"].user
        if hasattr(user, "profile"):
            raise serializers.ValidationError(
                "Profile already exists."
            )
        return attrs

    def create(self, validated_data):
        request = self.context["request"]
        user = request.user

        # Detect social login
        social_account = user.socialaccount_set.first()

        return Profile.objects.create(
            user=user,
            phone=validated_data["phone"],
            address=validated_data["address"],
            avatar=validated_data.get("avatar"),
            is_social_login=bool(social_account),
            social_provider=(
                social_account.provider if social_account else None
            ),
        )
