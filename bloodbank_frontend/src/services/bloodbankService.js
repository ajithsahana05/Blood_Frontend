import { axiosInstance, URL } from './config';

export const UserSignup = (params) =>{
    return axiosInstance.post(URL.UserSignup, params)
 }

export const BloodGroupList = () => {
    return axiosInstance.get(URL.bloodGroupList)
}

export const UserLogin = (params) => {
    return axiosInstance.post(URL.UserLogin, params)
}

export const ProfileDashboard = (params) => {
    return axiosInstance.get(URL.ProfileDashboard+params)
}

export const BloodRequestCreate = (params) => {
    return axiosInstance.post(URL.BloodRequestCreate, params)
}

export const BloodRequestByProfileId = (params) => {
    return axiosInstance.get(URL.BloodRequestByProfile+params)
}

export const AdminLoginApi = (params) => {
    return axiosInstance.post(URL.AdminLoginUrl,params)
}

export const AdminDashboardApi = () => {
    return axiosInstance.get(URL.AdminDashboard)
}

export const AdminPatientAndDonorList = (params) => {
    return axiosInstance.get(URL.AdminProfileList+params)
}

export const AdminBloodRequestList = (params) => {
    return axiosInstance.get(URL.AdminAllBloodRequestList+params)
}

export const AdminBloodRequestEdit = (id,payload) => {
    return axiosInstance.put(URL.AdminBloodRequestEdit+id,payload)
}

export const DonationRequestCreateAPI = (payload) => {
    return axiosInstance.post(URL.DonationRequestCreate,payload)
}



export const DonationProfileHistory = (id) => {
    return axiosInstance.get(URL.DonationHistory+id)
}

export const AdminBloodDonationList = (status) => {
    return axiosInstance.get(URL.AdminAllBloodDonationList+status)
}

export const AdminBloodDonationEdit = (id,payload) => {
    return axiosInstance.put(URL.AdminDonationEdit+id,payload)
}
export const AdminBloodStockUpdate = (id,payload) => {
    return axiosInstance.put(URL.AdminBloodStockUpdate+id,payload)
}