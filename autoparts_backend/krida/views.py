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
from rest_framework_jwt.utils import jwt_encode_handler
from datetime import datetime

# JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
# JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER
# Create your views here.
# from django.utils.translation import ugettext_lazy as _, ungettext_lazy



class BloodGroupCreate(CreateAPIView):
    serializer_class = BloodGroupInfoSerializers
    permission_classes = (AllowAny,)
    def get(self,request):
        try:
            # BloodGroupInfo.objects.bulk_create([BloodGroupInfo(blood_group="A+"),BloodGroupInfo(blood_group="A-"),BloodGroupInfo(blood_group="B+"),BloodGroupInfo(blood_group="B-"),BloodGroupInfo(blood_group="O+"),BloodGroupInfo(blood_group="O-"),BloodGroupInfo(blood_group="AB+"),BloodGroupInfo(blood_group="AB-")])
            # ProfileTypeInfo.objects.bulk_create([ProfileTypeInfo(name = "Patient"),ProfileTypeInfo(name = "Donar")])
            # BloodGroupInfo.objects.bulk_update([BloodGroupInfo(id=1,blood_group="A+",stock_unit=120),BloodGroupInfo(id=2,blood_group="A-",stock_unit=156),BloodGroupInfo(id=3,blood_group="B+",stock_unit=196),BloodGroupInfo(id=4,blood_group="B-",stock_unit=50),BloodGroupInfo(id=5,blood_group="O+",stock_unit=25),BloodGroupInfo(id=6,blood_group="O-",stock_unit=196),BloodGroupInfo(id=7,blood_group="AB+",stock_unit=35),BloodGroupInfo(id=8,blood_group="AB-",stock_unit=125)])
            # BloodGroupInfo.objects.filter(id=1).update(stock_unit=120)
            # BloodGroupInfo.objects.filter(id=2).update(stock_unit=156)
            # BloodGroupInfo.objects.filter(id=3).update(stock_unit=50)
            # BloodGroupInfo.objects.filter(id=4).update(stock_unit=25)
            # BloodGroupInfo.objects.filter(id=5).update(stock_unit=196)
            # BloodGroupInfo.objects.filter(id=6).update(stock_unit=35)
            # BloodGroupInfo.objects.filter(id=7).update(stock_unit=120)
            # BloodGroupInfo.objects.filter(id=8).update(stock_unit=125)
            profileType = ProfileTypeInfo.objects.all()
            a = ProfileTypeInfoSerializers(profileType,many=True)
            bloodGroup = BloodGroupInfo.objects.all()
            serializer = self.serializer_class(bloodGroup,many=True)
            res = {"status":"success","message":"Profile signup successfully","list":serializer.data,"profile_type":a.data}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)



class ProfileSignup(CreateAPIView):
    serializer_class = ProfileInfoSerializers
    permission_classes = (AllowAny,)
    profileinfo = ProfileInfo.objects.all()
    def post(self,request):
        try:
            form = ProfileInfoForms(request.POST,request.FILES)
            if form.is_valid():  
                form.save()
                res = {"status":"success","message":"Profile signup successfully"}
            else:
                res = {"status":"failure","message":eval(form.errors.as_json())}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)
    def get(self,request):
        try:
            profiledata = ProfileInfo.objects.all()
            
            serializer = self.serializer_class(profiledata,many=True)
           
            res = {"status":"success","message":"Profile retrived successfully","profile_list":serializer.data}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)


class Login(CreateAPIView):
    serializer_class = ProfileInfoSerializers
    permission_classes = (AllowAny,)
    profileinfo = ProfileInfo.objects.all()
    def post(self,request):
        try:
            if ProfileInfo.objects.filter(email = request.data["email"],password = request.data["password"]).exists():
                details = ProfileInfo.objects.get(email = request.data["email"])
                serializer = self.serializer_class(details,many=False)
                # jwt_encode = jwt_encode_handler(details)
                # jwt_token = api_settings.JWT_AUTH_HEADER_PREFIX + ' ' + jwt_encode.decode('utf-8')
                res = {"status":"success","message":"Login successfully","details":serializer.data,"token":"jwt_token"}
            else:
                res = {"status":"failure","message":"Email and password mismatch"}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)

class BloodRequestCreate(CreateAPIView):
    serializer_class = BloodGroupReequestInfoSerializers
    permission_classes = (AllowAny,)
    
    def post(self,request):
        try:
            serializer = self.serializer_class(data = request.data)
            if serializer.is_valid():
                serializer.save()
                res = {"status":"success","message":"Blood request created"}
            else:
                res = {"status":"failure","message":serializer.errors}

        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)


class ViewMyRequest(RetrieveAPIView):
    serializer_class = BloodGroupReequestInfoSerializers
    permission_classes = (AllowAny,)
    bloodGroupRequest = BloodGroupReequest.objects.all()
    def get(self,request,id):
        try:
            bloodGroupRequestList = self.bloodGroupRequest.filter(profile_id=id)
            serializer = self.serializer_class(bloodGroupRequestList,many=True)
            res = {"status":"success","message":"Retrived successfully","list":serializer.data}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)

class DonationRequestView(CreateAPIView):
    serializer_class = DonationRequestInfoSerializers
    permission_classes = (AllowAny,)
    bloodRequest = BloodGroupReequest.objects.all()
    def post(self,request):
        try:
            serializer = self.serializer_class(data = request.data)
            if serializer.is_valid():
                serializer.save()
                res = {"status":"success","message":"Saved successfully"}
            else:
                res = {"status":"failure","message":serializer.errors}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)

class DonationRequestList(RetrieveAPIView):
    serializer_class = DonationRequestInfoSerializers
    permission_classes = (AllowAny,)
    def get(self,request,id):
        try:
            bloodDonate = DonationRequest.objects.filter(profile_id = id)
            serializer = self.serializer_class(bloodDonate,many = True)
            res = {"status":"success","message":"Retrived successfully","list":serializer.data}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)


class ProfileDashboard(RetrieveAPIView):
    serializer_class = ProfileInfoSerializers
    permission_classes = (AllowAny,)
    def get(self,request,id):
        try:
            reqCount = BloodGroupReequest.objects.filter(profile_id = id).count()
            pendingCount = BloodGroupReequest.objects.filter(profile_id = id,status = "pending").count()
            approvedCount = BloodGroupReequest.objects.filter(profile_id = id,status = "approved").count()
            rejectedCount = BloodGroupReequest.objects.filter(profile_id = id,status = "rejected").count()
            # res = {"status":"success","message":"Retrived successfully","request_count":reqCount,"pending_request":pendingCount,"approved_count":approvedCount,"rejected_count":rejectedCount}
            res = {"status":"success","message":"Retrived successfully","dashboard_list":[{"title":"Request made","count":reqCount},{"title":"Pending request","count":pendingCount},{"title":"Approved request","count":approvedCount},{"title":"Rejected request","count":rejectedCount}]}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
        return JsonResponse(res)

from geopy.geocoders import Nominatim


class testapi(CreateAPIView):
    permission_classes = (AllowAny,)
    def get(self,request):
        try:
            geolocator = Nominatim(user_agent="geoapiExercises")
            Latitude = "13.0241664"
            Longitude = "80.243273"
            location = geolocator.reverse(Latitude+","+Longitude)
            print(location,"???????????")
            address = location.raw['address']
            print(address)
            res = {"status":"success","message":"location"}
        except Exception as error:
            res = {"status":"failure","message":str(error)}
            return JsonResponse(res)