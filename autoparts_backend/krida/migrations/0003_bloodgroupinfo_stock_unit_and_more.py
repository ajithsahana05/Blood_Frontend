# Generated by Django 4.0.2 on 2023-02-14 06:30

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('krida', '0002_alter_bloodgroupreequest_updated_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='bloodgroupinfo',
            name='stock_unit',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='bloodgroupreequest',
            name='updated_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 2, 14, 12, 0, 51, 304199), null=True),
        ),
    ]