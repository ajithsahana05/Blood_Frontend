"""autoparts_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include,path
from customer import views 
from rest_framework import routers
from krida.views import ProfileSignup
from django.conf.urls.static import static
from django.conf import settings


router = routers.DefaultRouter()
# router.register('signup', ProfileSignup)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    # path('customer/add',views.customer_signup),
    path('',include('krida.urls')),
    # path('login/api',views.login_api),
    # path('enquiry/add', views.enquiry_create),
    # path('customer/enquiry/list/<int:pk>',views.enquiry_list_by_customer),
    # path('new/enquiry/list',views.new_enquiry_list),
    # path('enquiry/detail/<int:pk>',views.enquiry_detail_by_id),
    # path('new/enquiry/status/update/<int:pk>',views.enquiry_status_update),
    # path('add/supplier',views.supplier_signup),
    # path('view/supplier',views.supplier_id),
    # path('quotation/add', views.quotation_create),
    # path('quotation/view/<int:pk>', views.quotation_list),
    # path('brand/add', views.brand_add),
    # path('car/model/add', views.cmar_model_info),
    # path('car/model/list/<int:pk>', views.car_model_list),
    # path('dashboar/count', views.admin_dashboard_count),
    # path('brand/exists', views.brand_exist),
    # path('model/exists', views.car_model_exist),
    # path('notification/list/<int:pk>', views.notification_list),
    # path('quotation/view/notification', views.QuotationView),
    # path('streaming',views.streaming_API),
    

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)