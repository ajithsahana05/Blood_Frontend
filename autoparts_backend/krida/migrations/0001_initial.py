# Generated by Django 4.0.2 on 2023-02-13 16:52

import datetime
from django.db import migrations, models
import django.db.models.deletion
import krida.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BloodGroupInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('blood_group', models.CharField(max_length=10)),
            ],
            options={
                'db_table': 'bloodgroup_info',
            },
        ),
        migrations.CreateModel(
            name='ProfileTypeInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
            options={
                'db_table': 'profile_type_info',
            },
        ),
        migrations.CreateModel(
            name='ProfileInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('name', models.CharField(max_length=45, null=True)),
                ('age', models.IntegerField(null=True)),
                ('email', models.EmailField(max_length=254, null=True, unique=True)),
                ('mobile_no', models.CharField(max_length=15, null=True)),
                ('address', models.CharField(max_length=255, null=True)),
                ('disease', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255, null=True)),
                ('profile_image', models.ImageField(blank=True, null=True, upload_to=krida.models.upload_path)),
                ('blood_group', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='krida.bloodgroupinfo')),
                ('profile_type', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='krida.profiletypeinfo')),
            ],
            options={
                'db_table': 'profile_info',
            },
        ),
        migrations.CreateModel(
            name='BloodGroupReequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient_name', models.CharField(max_length=30, null=True)),
                ('patient_age', models.IntegerField(null=True)),
                ('reason', models.TextField(null=True)),
                ('unit', models.IntegerField(null=True)),
                ('status', models.CharField(default='pending', max_length=30, null=True)),
                ('updated_date', models.DateTimeField(default=datetime.datetime(2023, 2, 13, 22, 22, 53, 558444))),
                ('blood_group', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='krida.bloodgroupinfo')),
                ('profile_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='krida.profileinfo')),
            ],
            options={
                'db_table': 'bloodgroup_request_info',
            },
        ),
    ]
