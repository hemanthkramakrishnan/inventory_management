# We will create a `CustomUser` model that includes a role field to distinguish between staff and manager.
# To do this, add the following code in `users/models.py`:

from rest_framework import serializers
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'email', 'role', 'profile_picture', 'first_name', 'last_name')

    def create(self, validated_data):
        role = validated_data.pop('role', None)
        user = CustomUser.objects.create_user(**validated_data)
        if role:
            user.role = role
            if role == 'staff':
                user.is_staff_user = True
            elif role == 'manager':
                user.is_manager = True
        user.save()
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
            instance.save()
            return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Add a default profile picture if not set
        if not instance.profile_picture:
            representation['profile_picture'] = 'profile_pics/default_user.png'
        return representation
