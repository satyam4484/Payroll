import axiosClient from "./apiClient";
import { AxiosResponse } from "axios";

/* Authentication */
export const userLogin = (data: any): Promise<any> => {
    return axiosClient().post('user/login', data).then((response: AxiosResponse<any>) => response.data);
};


/* User */
export const getUserProfile = (): Promise<any> => {
    return axiosClient().get('users').then((response: AxiosResponse<any>) => response.data);
}