from django.contrib.auth.models import AbstractUser
from django.db import models
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
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
    profile_picture = models.ImageField(upload_to='', blank=True, null=True, max_length=255)

    def save(self, *args, **kwargs):
        # If no profile picture is provided, generate one with initials
        if not self.profile_picture:
            initials = f"{self.first_name[:1]}{self.last_name[:1]}".upper()
            image = Image.new('RGB', (100, 100), self._get_light_color())
            draw = ImageDraw.Draw(image)
            font = ImageFont.load_default()
            text_width, text_height = draw.textbbox((0, 0), initials, font=font)[2:]
            position = ((100 - text_width) / 2, (100 - text_height) / 2)
            draw.text(position, initials, fill='black', font=font)

            # Save the image to a BytesIO object
            temp_file = BytesIO()
            image.save(temp_file, format='PNG')
            temp_file.seek(0)

            # Set the image as the profile picture
            self.profile_picture.save(f"profile_pics/{self.username}_profile.png", ContentFile(temp_file.read()),
                                      save=False)

        if self.role == 'staff':
            self.is_staff_user = True
            self.is_manager = False
        elif self.role == 'manager':
            self.is_manager = True
            self.is_staff_user = False

        super().save(*args, **kwargs)

    def _get_light_color(self):
        # Generate a random background color for the profile picture
        import random
        return random.choice(['#f0f8ff', '#e6e6fa', '#fafad2', '#ffe4e1', '#e0ffff', '#f5fffa'])
