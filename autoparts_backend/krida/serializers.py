from rest_framework import serializers
from .models import *
from django import forms 
from django.forms import fields


class BloodGroupInfoSerializers(serializers.ModelSerializer):
    class Meta():
        model = BloodGroupInfo
        fields = "__all__"

class ProfileTypeInfoSerializers(serializers.ModelSerializer):
    class Meta():
        model = ProfileTypeInfo
        fields = "__all__"


class ProfileInfoSerializers(serializers.ModelSerializer):
    profile_type_name = serializers.SerializerMethodField()
    blood_group_name = serializers.SerializerMethodField()
    class Meta():
        model = ProfileInfo
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}
    def get_profile_type_name(self,obj):
        return obj.profile_type.name if obj.profile_type else None
    def get_blood_group_name(self,obj):
        return obj.blood_group.blood_group if obj.blood_group else None

class ProfileInfoForms(forms.ModelForm):
    class Meta():
        model = ProfileInfo
        fields = "__all__"

class BloodGroupReequestInfoSerializers(serializers.ModelSerializer):
    blood_group_name = serializers.SerializerMethodField()
    profile_name = serializers.SerializerMethodField()
    class Meta():
        model = BloodGroupReequest
        fields = "__all__"
    def get_blood_group_name(self,obj):
        return obj.blood_group.blood_group if obj.blood_group else None
    def get_profile_name(self,obj):
        return obj.profile_id.name if obj.profile_id else None


class AdminInfoSerializers(serializers.ModelSerializer):  
    class Meta():
        model = AdminInfo
        fields = "__all__"


class DonationRequestInfoSerializers(serializers.ModelSerializer):
    blood_group_name = serializers.SerializerMethodField()
    class Meta():
        model = DonationRequest
        fields = "__all__"
    def get_blood_group_name(self,obj):
        return obj.blood_group.blood_group if obj.blood_group else None