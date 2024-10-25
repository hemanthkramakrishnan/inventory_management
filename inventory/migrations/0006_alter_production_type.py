# Generated by Django 5.0.6 on 2024-06-04 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0005_product_size'),
    ]

    operations = [
        migrations.AlterField(
            model_name='production',
            name='type',
            field=models.CharField(choices=[('1', 'Stock-IN'), ('2', 'Stock-OUT')], default='1', max_length=2),
        ),
    ]
