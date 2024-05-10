import axiosClient from "./apiClient";
import { AxiosResponse } from "axios";

/* Authentication */

interface UserData {
    user_id: string;
    password: string;
}

export const userLogin = (data: UserData): Promise<any> => {
    return axiosClient().post('users/login', data).then((response: AxiosResponse<any>) => response.data);
};
