import axiosClient from "./apiClient";

/* Authentication */
export const userLogin = (data) => {
    return axiosClient().post('user/login', JSON.stringify(data)).then(response => response.data)
}

export const getUserProfile = (id) => {
    return axiosClient().get(`user/${id}`).then(response => response.data)
}

export const createNewUser = (data) => {
    return axiosClient().post('user', JSON.stringify(data)).then(response => response.data);
}

/* Category */
export const getCategoryList = () => {
    return axiosClient().get('category').then(response => response.data)
}

/* Company */
export const getCompanyList = () => {
    return axiosClient().get('company').then(response => response.data)
}