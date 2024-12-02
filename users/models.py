from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.files.base import ContentFile


# Extending the default User model
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('staff', 'Staff'),
        ('manager', 'Manager'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, blank=True, null=True)
    is_staff_user = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.role == 'staff':
            self.is_staff_user = True
            self.is_manager = False
        elif self.role == 'manager':
            self.is_manager = True
            self.is_staff_user = False

        super().save(*args, **kwargs)
