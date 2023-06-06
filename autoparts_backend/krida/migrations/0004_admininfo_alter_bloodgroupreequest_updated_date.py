# Generated by Django 4.0.2 on 2023-02-14 07:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('krida', '0003_bloodgroupinfo_stock_unit_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, null=True, unique=True)),
                ('password', models.CharField(max_length=30, null=True)),
            ],
            options={
                'db_table': 'admin_info',
            },
        ),
        migrations.AlterField(
            model_name='bloodgroupreequest',
            name='updated_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 2, 14, 12, 50, 10, 21925), null=True),
        ),
    ]
