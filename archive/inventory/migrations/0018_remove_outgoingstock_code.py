# Generated by Django 5.0.6 on 2024-10-19 04:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0017_outgoingstock_batch_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='outgoingstock',
            name='code',
        ),
    ]