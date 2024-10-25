# Generated by Django 5.0.6 on 2024-10-19 22:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0019_rename_code_outgoinglog_batch_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='incomingstock',
            name='outgoing_stock',
        ),
        migrations.AddField(
            model_name='incomingstock',
            name='outgoing_log',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='incoming_stocks', to='inventory.outgoinglog'),
            preserve_default=False,
        ),
    ]
