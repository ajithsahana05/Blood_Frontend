# Generated by Django 4.0.2 on 2023-03-10 14:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('krida', '0005_alter_bloodgroupreequest_updated_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bloodgroupreequest',
            name='updated_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 3, 10, 20, 14, 1, 666793), null=True),
        ),
    ]
