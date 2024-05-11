import axiosClient from "./apiClient";

/* Authentication */
export const userLogin = (data) => {
    return axiosClient().post('user/login', JSON.stringify(data)).then(response => response.data)
}

export const getUserProfile = (id) => {
    return axiosClient().get(`user/${id}`).then(response => response.data)
}