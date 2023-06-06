from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager,AbstractBaseUser
# from django.db.models.signals import post_save
import uuid
from datetime import datetime

from django.utils import tree
# Create your models here.
class BloodGroupInfo(models.Model):
    blood_group = models.CharField(max_length=10)
    stock_unit = models.IntegerField(null=True)
    class Meta():
        db_table = "bloodgroup_info"

class ProfileTypeInfo(models.Model):
    name = models.CharField(max_length=30)
    class Meta():
        db_table = "profile_type_info"

class ProfileManager(BaseUserManager):
    def create_profile(self):
        return True

def upload_path(instance, filname):
    return '/'.join(['bloodbank', filname])

class ProfileInfo(AbstractBaseUser):
    name = models.CharField(max_length=45,null=True)
    age = models.IntegerField(null=True)
    email = models.EmailField(unique=True,null=True)
    mobile_no = models.CharField(max_length=15,null=True)
    address = models.CharField(max_length=255,null=True)
    blood_group = models.ForeignKey(BloodGroupInfo,on_delete=models.CASCADE,null=True)
    disease = models.CharField(max_length=255)
    password = models.CharField(max_length=255,null=True)
    profile_type = models.ForeignKey(ProfileTypeInfo,on_delete=models.CASCADE,null=True)
    profile_image = models.ImageField(blank=True, null=True, upload_to=upload_path)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = ProfileManager()
    class Meta(): 
        db_table = "profile_info"

    def __str__(self):
        return self.name


class BloodGroupReequest(models.Model):
    profile_id = models.ForeignKey(ProfileInfo,on_delete=models.CASCADE,null=True)
    patient_name = models.CharField(max_length=30,null=True)
    patient_age = models.IntegerField(null=True)
    reason = models.TextField(null=True)
    blood_group = models.ForeignKey(BloodGroupInfo,on_delete=models.CASCADE)
    unit = models.IntegerField(null=True)
    status = models.CharField(max_length=30,default="pending",null=True)
    updated_date = models.DateTimeField(default=datetime.now(),null=True)
    class Meta():
        db_table  = "bloodgroup_request_info"


class AdminInfo(models.Model):
    email = models.EmailField(unique=True,null=True)
    password = models.CharField(max_length=30,null=True)

    class Meta():
        db_table = "admin_info"


class DonationRequest(models.Model):
    profile_id = models.ForeignKey(ProfileInfo,on_delete=models.CASCADE,null=True)
    blood_group = models.ForeignKey(BloodGroupInfo,on_delete=models.CASCADE,null=True)
    name = models.CharField(max_length=30,null=True)
    age = models.IntegerField(null=True)
    disease = models.CharField(max_length=255,null=True)
    unit = models.IntegerField(null=True)
    status = models.CharField(max_length=30,default="pending",null=True)
    updated_date = models.DateTimeField(null=True,auto_now=True)

    class Meta():
        db_table = "donation_request_info"

# def post_donation_request_save(sender,instance,**kwargs):
#     print("Yes")

# post_save.connect(post_donation_request_save,DonationRequest)
