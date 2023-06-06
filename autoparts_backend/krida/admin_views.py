from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.decorators import permission_classes
from .models import *
from krida.serializers import *
# from rest_framework_jwt.authentication import JSONWebTokenAuthentication
# from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_jwt.settings import api_settings
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from autoparts_backend.settings import *
from django.core.files.storage import FileSystemStorage
from django.core.files.storage import default_storage
# from notification_app.views import *
# from django_s3_storage.storage import S3Storage
from datetime import datetime


class AdminLoginView(CreateAPIView,RetrieveAPIView):
    serializer_class = AdminInfoSerializers
    permission_classes = (AllowAny,)
    def post(self,request):
        try:
            LoginCheck = AdminInfo.objects.filter(email=request.data["email"],password = request.data["password"])
            if LoginCheck.exists():
                res = {"status":"success","message":"Login successfully"}
            else:
                res = {"status":"failure","message":"Email and Password Mis-Match"}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)

    def get(self,request):
        try:
            bloodGroupInfo = BloodGroupInfo.objects.all()
            serializer = BloodGroupInfoSerializers(bloodGroupInfo,many=True)
            donarCount = ProfileInfo.objects.filter(profile_type=2).count()
            patientCount = ProfileInfo.objects.filter(profile_type=1).count()
            totalRequest = BloodGroupReequest.objects.all().count()
            pendingRequest = BloodGroupReequest.objects.filter(status="pending").count()
            approvedRequest = BloodGroupReequest.objects.filter(status="approved").count()
            profileList = [{"profile_info":"Total Donor","count":donarCount},{"profile_info":"Total Request","count":totalRequest},{"profile_info":"Approved Request","count":approvedRequest},{"profile_info":"Total Patient","count":patientCount}]
            res = {"status":"success","message":"Retrived successfully","bloodInfo":serializer.data,"profile_list":profileList}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)

class ProfileList(RetrieveAPIView):
    serializer_class = ProfileInfoSerializers
    permission_classes = (AllowAny,)
    profile_info = ProfileInfo.objects.all()
    def get(self,request,id):
        try:
            profileInfo = self.profile_info.filter(profile_type=id)
            serializer = self.serializer_class(profileInfo,many=True)
            res = {"status":"success","message":"Retrived successfully","profile_list":serializer.data}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)


class BloodDonationEdit(UpdateAPIView):
    serializer_class = DonationRequestInfoSerializers
    permission_classes = (AllowAny,)
    donationRequest = DonationRequest.objects.all()
    def put(self,request,id):
        try:
            donation = self.donationRequest.get(id = id)
            print(donation.blood_group.id)
            if request.data["action"] == "approved":
                bloodGroup = BloodGroupInfo.objects.get(id = donation.blood_group.id)
                BloodGroupInfo.objects.filter(id=donation.blood_group.id).update(stock_unit = bloodGroup.stock_unit + donation.unit)
                self.donationRequest.filter(id = id).update(status = "approved")
            else:
                self.donationRequest.filter(id = id).update(status = "rejected")
            res = {"status":"success","message":"donation edited successfully"}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)


class BloodRequestEdit(UpdateAPIView):
    serializer_class = BloodGroupReequestInfoSerializers
    permission_classes = (AllowAny,)
    bloodRequest = BloodGroupReequest.objects.all()
    def put(self,request,id):
        try:
            bloodReq = self.bloodRequest.get(id = id)
            if request.data["action"] == "approved":
                bloodGroup = BloodGroupInfo.objects.get(id = bloodReq.blood_group.id)
                if bloodGroup.stock_unit < bloodReq.unit:
                    return JsonResponse({"status":"failure","message":"Blood unit is not available"})
                else:
                    BloodGroupInfo.objects.filter(id=bloodReq.blood_group.id).update(stock_unit = bloodGroup.stock_unit - bloodReq.unit)
                    self.bloodRequest.filter(id = id).update(status = "approved")
            else:
                self.bloodRequest.filter(id = id).update(status = "rejected")
            res = {"status":"success","message":"blood request edited successfully"}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)


class BloodGroupList(RetrieveAPIView):
    serializer_class = BloodGroupInfoSerializers
    permission_classes = (AllowAny,)

    def get(self,request):
        try:
            bloodGroup = BloodGroupInfo.objects.all()
            serializer = self.serializer_class(bloodGroup,many=True)
            res = {"status":"success","message":"retrived successfully","list":serializer.data}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)
    
class AdminBloodRequestList(RetrieveAPIView):
    serializer_class = BloodGroupReequestInfoSerializers
    permission_classes = (AllowAny,)
    def get(self,request,status):
        try:
            if status == "pending":
                bloodRequest = BloodGroupReequest.objects.filter(status = status)
                serializer = self.serializer_class(bloodRequest,many = True)
            else:
                bloodRequest = BloodGroupReequest.objects.all()
                serializer = self.serializer_class(bloodRequest,many = True)
            res = {"status":"success","message":"retrived successfully","list":serializer.data}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)

class AdminAllDonationList(RetrieveAPIView):
    serializer_class = DonationRequestInfoSerializers
    permission_classes = (AllowAny,)
    def get(self,request,status):
        try:
            if status == 'pending':
                donateBlood = DonationRequest.objects.filter(status = status)
                serializer = self.serializer_class(donateBlood,many = True)
            else:
                donateBlood = DonationRequest.objects.exclude(status = "pending")
                print(donateBlood,"???????????????")
            serializer = self.serializer_class(donateBlood,many = True)
            res = {"status":"success","message":"retrived successfully","list":serializer.data}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)


class AdminBloodStockUpdate(UpdateAPIView):
    serializer_class = BloodGroupInfoSerializers
    permission_classes = (AllowAny,)
    def put(self,request,id):
        try:
            stockUnit = BloodGroupInfo.objects.get(id=id)
            BloodGroupInfo.objects.filter(id=id).update(stock_unit = request.data["stock_unit"]+stockUnit.stock_unit)
            res = {"status":"success","message":"blood unit update successfully"}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)