# Generated by Django 4.0.2 on 2023-02-16 06:51

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('krida', '0004_admininfo_alter_bloodgroupreequest_updated_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bloodgroupreequest',
            name='updated_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 2, 16, 12, 21, 38, 571738), null=True),
        ),
        migrations.CreateModel(
            name='DonationRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, null=True)),
                ('age', models.IntegerField(null=True)),
                ('disease', models.CharField(max_length=255, null=True)),
                ('unit', models.IntegerField(null=True)),
                ('status', models.CharField(default='pending', max_length=30, null=True)),
                ('updated_date', models.DateTimeField(auto_now=True, null=True)),
                ('blood_group', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='krida.bloodgroupinfo')),
                ('profile_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='krida.profileinfo')),
            ],
            options={
                'db_table': 'donation_request_info',
            },
        ),
    ]
