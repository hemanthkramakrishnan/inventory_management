# Generated by Django 5.0.6 on 2024-10-19 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0016_remove_incomingstock_outgoing_log_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='outgoingstock',
            name='batch_code',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
