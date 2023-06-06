import axios from 'axios';
export const BASE_URL = "http://89.116.30.81:9002/";

export const axiosInstance = axios.create({
    baseURL: BASE_URL
  });

  
  
export const URL = {
    UserSignup:"signup",
    bloodGroupList:"blood/group/list",
    UserLogin:"login",
    ProfileDashboard:"profile/request/dashboard/",
    BloodRequestCreate:"blood/request",
    BloodRequestByProfile:"blood/request/by/profile/",
    
    DonationRequestCreate:"blood/donation/create",
    DonationHistory:"blood/donate/history/",

    AdminLoginUrl:"krida/admin/login",
    AdminDashboard:"krida/admin/dashboard",
    AdminProfileList:"krida/admin/profile/list/",
    AdminAllBloodRequestList:"krida/admin/all/blood/request/list/",
    AdminBloodRequestEdit:"krida/admin/blood/request/edit/",
    AdminAllBloodDonationList:"krida/admin/all/donation/request/list/",
    AdminDonationEdit:"krida/admin/blood/donate/edit/",
    AdminBloodStockUpdate:"krida/admin/blood/stock/update/",
    

}