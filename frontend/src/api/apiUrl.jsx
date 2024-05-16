import axiosClient from "./apiClient";

/* Authentication */
export const userLogin = (data) => {
    return axiosClient().post('user/login', JSON.stringify(data)).then(response => response.data)
}

/* User */

export const getUserProfile = (id) => {
    return axiosClient().get(`user/${id}`).then(response => response.data)
}

export const createNewUser = (data) => {
    return axiosClient().post('user', JSON.stringify(data)).then(response => response.data);
}

export const updateUser = (id, data) => {
    return axiosClient().put(`user/${id}`, JSON.stringify(data)).then(response => response.data);
}

export const getUserList = () => {
    return axiosClient().get('user').then(response => response.data)
}

/* Category */
export const getCategoryList = () => {
    return axiosClient().get('category').then(response => response.data)
}

/* Company */
export const getCompanyList = () => {
    return axiosClient().get('company').then(response => response.data)
}

export const createNewCompany = (data) => {
    return axiosClient().post('company', JSON.stringify(data)).then(response => response.data)
}

export const getCompanyById = (id) => {
    return axiosClient().get(`company/${id}`).then(response => response.data)
}

/* Attendance */

export const getAttendanceSheet = (data) => {
    return axiosClient().post('attendance/sheet', JSON.stringify(data)).then(response => response.data)
}

export const uploadAttendanceSheet = (data) => {
    return axiosClient().post('attendance/mark_sheet', JSON.stringify(data)).then(response => response.data)
}

export const getTodayAttendance = (id, date) => {
    return axiosClient().get(`attendance/today/${id}?date=${date}`).then(response => response.data)
}


/* Payroll */

export const addPayrollDetails = (data) => {
    return axiosClient().post('payroll', JSON.stringify(data)).then(response => response.data)
}

export const getPayrollDetails = (id) => {
    return axiosClient().get(`payroll/${id}`).then(response => response.data)
}

export const updatePayrollDetails = (id, data) => {
    return axiosClient().put(`payroll/${id}`, JSON.stringify(data)).then(response => response.data)
}

/* File Upload */