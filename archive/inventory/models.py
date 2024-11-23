from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from phonenumber_field.modelfields import PhoneNumberField


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, blank=True)
    photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()


class Category(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField()

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    code = models.CharField(unique=True, max_length=20)
    size = models.IntegerField(default=0)
    description = models.TextField()
    price = models.FloatField(default=0)
    # cost = models.FloatField(default=0)

    def __str__(self):
        return self.description + " " + str(self.size) + 'cm'


class Tailor(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    phone = PhoneNumberField(blank=False)
    address = models.TextField()

    def __str__(self):
        return self.name


class Warehouse(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    phone = PhoneNumberField(blank=False)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Stock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    # tailor = models.ForeignKey(Tailor, on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    date_added = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.product.description} - {self.quantity}'


class OutgoingStock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    tailor = models.ForeignKey(Tailor, on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=timezone.now)
    batch_code = models.CharField(max_length=50, blank=True)

    def days_since_entry(self):
        time_diff = timezone.now() - self.date_created
        days = time_diff.days
        minutes = (time_diff.seconds // 60) % 60  # Remaining minutes after the hour
        hours = time_diff.seconds // 3600  # Convert seconds to hours
        if days > 0:
            return f"{days} days, {hours} hours, and {minutes} minutes ago"
        elif hours > 0:
            return f"{hours} hours, and {minutes} minutes ago"
        else:
            return f"{minutes} minutes ago"

    def save(self, *args, **kwargs):
        # Auto-generate the batch code if it hasn't been set
        if not self.batch_code:
            today_str = timezone.now().strftime('%Y%m%d')  # Format today's date as YYYYMMDD
            self.batch_code = f'{self.tailor.code}-{today_str}'

        super(OutgoingStock, self).save(*args, **kwargs)  # Call the parent save method

    def __str__(self):
        return f'{self.product.description} - {self.product.code} - {self.batch_code} - {self.quantity} {self.tailor.code} (Outgoing)'


class OutgoingLog(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    tailor = models.ForeignKey(Tailor, on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=timezone.now)
    batch_code = models.CharField(max_length=32, default='')

    def __str__(self):
        return f'{self.product.description} - {self.quantity} (Outgoing Log)'


class IncomingStock(models.Model):
    outgoing_log = models.ForeignKey(OutgoingLog, on_delete=models.CASCADE, related_name='incoming_stocks')
    outgoing_stock = models.ForeignKey(OutgoingStock, on_delete=models.CASCADE, related_name='incoming_stocks', null=True, blank=True)
    quantity = models.IntegerField(default=0)
    date_added = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        # First, find the OutgoingLog using the product and batch_code (which should be passed from the form)
        product = self.outgoing_stock.product  # Assuming you have an outgoing_stock
        batch_code = self.outgoing_stock.batch_code  # Assuming batch_code is in outgoing_stock
        date_created = self.outgoing_stock.date_created

        # Try to get the corresponding outgoing log using the product and batch code
        try:
            outgoing_log = OutgoingLog.objects.get(product=product, batch_code=batch_code, date_created=date_created)
            # Set the outgoing_log value to the one found
            self.outgoing_log = outgoing_log
        except OutgoingLog.DoesNotExist:
            raise ValueError(f"No OutgoingLog found for product '{product.code}' with batch code '{batch_code}'.")

        # Now adjust the outgoing stock quantity
        outgoing_stock = self.outgoing_stock
        outgoing_stock.quantity -= self.quantity

        # Delete the outgoing stock if quantity reaches zero
        if outgoing_stock.quantity <= 0:
            outgoing_stock.delete()
        else:
            outgoing_stock.save()

        # Nullify the outgoing_stock reference in IncomingStock
        self.outgoing_stock = None

        super().save(*args, **kwargs)  # Save the incoming stock instance after setting outgoing_stock to None

        # Update the stock table
        stock, created = Stock.objects.get_or_create(
            product=product,
            defaults={'quantity': self.quantity, 'date_added': self.date_added}
        )
        if not created:
            stock.quantity += self.quantity
            stock.save()

    def __str__(self):
        return f'{self.outgoing_log.product.description} - {self.quantity} (Incoming)'
