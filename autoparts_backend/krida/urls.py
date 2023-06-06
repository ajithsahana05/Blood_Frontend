from django.contrib import admin
from django.urls import path
from krida.views import *
from krida.admin_views import *



urlpatterns = [
    path('signup',ProfileSignup.as_view()),
    path('login',Login.as_view()),
    path('blood/request',BloodRequestCreate.as_view()),
    path('profile/request/dashboard/<int:id>',ProfileDashboard.as_view()),
    path('blood/group/create',BloodGroupCreate.as_view()),
    path('blood/group/list',BloodGroupList.as_view()),
    path('blood/request/by/profile/<int:id>',ViewMyRequest.as_view()),
    path('blood/donation/create',DonationRequestView.as_view()),
    path('blood/donate/history/<int:id>',DonationRequestList.as_view()),
    path('krida/admin/login',AdminLoginView.as_view()),
    path('krida/admin/dashboard',AdminLoginView.as_view()),
    path('krida/admin/profile/list/<int:id>',ProfileList.as_view()),
    path('krida/admin/blood/donate/edit/<int:id>',BloodDonationEdit.as_view()),
    path('krida/admin/blood/request/edit/<int:id>',BloodRequestEdit.as_view()),
    path('krida/admin/all/blood/request/list/<str:status>',AdminBloodRequestList.as_view()),
    path('krida/admin/all/donation/request/list/<str:status>',AdminAllDonationList.as_view()),
    path('testapi',testapi.as_view()),
    path('krida/admin/blood/stock/update/<int:id>',AdminBloodStockUpdate.as_view()),

]