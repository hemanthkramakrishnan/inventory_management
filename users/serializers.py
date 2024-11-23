from rest_framework import serializers
from .models import CustomUser, Staff, Manager


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'is_staff_user', 'is_manager', 'profile_picture')


class StaffSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Staff
        fields = ('id', 'user', 'role', 'email')


class ManagerSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()

    class Meta:
        model = Manager
        fields = ('id', 'user', 'department', 'email')
