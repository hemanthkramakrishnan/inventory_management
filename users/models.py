from django.contrib.auth.models import AbstractUser
from django.db import models
from PIL import Image, ImageDraw, ImageFont
import os
from django.conf import settings
from io import BytesIO
from django.core.files.base import ContentFile

# Extending the default User model
class CustomUser(AbstractUser):
    is_staff_user = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def save(self, *args, **kwargs):
        # If no profile picture is provided, generate one with initials
        if not self.profile_picture:
            initials = f"{self.first_name[:1]}{self.last_name[:1]}".upper()
            image = Image.new('RGB', (100, 100), self._get_random_color())
            draw = ImageDraw.Draw(image)
            font = ImageFont.load_default()
            text_width, text_height = draw.textsize(initials, font=font)
            position = ((100 - text_width) / 2, (100 - text_height) / 2)
            draw.text(position, initials, fill='white', font=font)

            # Save the image to a BytesIO object
            temp_file = BytesIO()
            image.save(temp_file, format='PNG')
            temp_file.seek(0)

            # Set the image as the profile picture
            self.profile_picture.save(f"{self.username}_profile.png", ContentFile(temp_file.read()), save=False)

        super().save(*args, **kwargs)

    def _get_random_color(self):
        # Generate a random background color for the profile picture
        import random
        return random.choice(['#1abc9c', '#3498db', '#9b59b6', '#e74c3c', '#f1c40f', '#2ecc71'])

# Staff model for additional staff details
class Staff(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='staff_profile')
    role = models.CharField(max_length=255)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.user.username

# Manager model for additional manager details
class Manager(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='manager_profile')
    department = models.CharField(max_length=255)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.user.username
